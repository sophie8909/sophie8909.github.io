import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const seoDataPath = join(root, 'src', 'seo', 'seoData.json');
const distPath = join(root, 'dist');
const publicSitemapPath = join(root, 'public', 'sitemap.xml');
const distIndexPath = join(distPath, 'index.html');

const seoData = JSON.parse(await readFile(seoDataPath, 'utf8'));

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const escapeHtml = escapeXml;
const canonicalUrl = (route) => {
  const canonicalPath = route === '/' ? '/' : `${route.replace(/\/+$/, '')}/`;
  return `${seoData.siteUrl}${canonicalPath}`;
};
const localizedUrl = (route, language) => `${canonicalUrl(route)}?lang=${language}`;
const calculatorUrl = 'https://sxstx.feiyastudio.com/';
const updateArchiveRoute = '/sxstx-calculator/blog/update';

const parseMarkdownFile = (markdown) => {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, content: markdown.trim() };
  }

  const data = match[1].split(/\r?\n/).reduce((accumulator, line) => {
    const separatorIndex = line.indexOf(':');

    if (separatorIndex === -1) {
      return accumulator;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (key) {
      accumulator[key] = value;
    }

    return accumulator;
  }, {});

  return { data, content: match[2].trim() };
};

const readMarkdownCollection = async (folder) => {
  const folderPath = join(root, 'blog', folder);
  const files = (await readdir(folderPath)).filter((file) => file.endsWith('.md'));

  return Promise.all(
    files.map(async (file) => {
      const markdown = await readFile(join(folderPath, file), 'utf8');
      const { data, content } = parseMarkdownFile(markdown);
      const slug = file.replace(/\.md$/, '');

      return { slug, data, content };
    })
  );
};

const updates = (await readMarkdownCollection('update'))
  .map(({ slug, data, content }) => ({
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    description: data.description ?? '',
    content,
    route: `${updateArchiveRoute}/${slug}`
  }))
  .filter((post) => post.title && post.date)
  .sort((a, b) => b.date.localeCompare(a.date));

const faq = (await readMarkdownCollection('faq'))
  .map(({ slug, data, content }) => ({
    slug,
    question: data.question ?? slug,
    order: Number(data.order ?? 9999),
    content
  }))
  .filter((entry) => entry.question && entry.content)
  .sort((a, b) => a.order - b.order);

const updateRouteEntries = updates.map((update) => [
  update.route,
  {
    title: `${update.title} | SXSTX Calculator | Feiya Studio`,
    description: update.description || 'Read an SXSTX Calculator update from Feiya Studio.',
    lastmod: update.date,
    schemas: ['WebSite', 'BreadcrumbList']
  }
]);

const latestUpdateDate = updates[0]?.date;
const routeEntries = Object.entries(seoData.routes).map(([route, meta]) => {
  if (
    latestUpdateDate &&
    (route === '/sxstx-calculator' || route === updateArchiveRoute) &&
    latestUpdateDate > meta.lastmod
  ) {
    return [route, { ...meta, lastmod: latestUpdateDate }];
  }

  return [route, meta];
});
const sitemapEntries = routeEntries.concat(updateRouteEntries);

const buildStructuredData = (route, meta) => {
  const graph = [];

  if (meta.schemas.includes('Organization')) {
    graph.push({
      '@type': 'Organization',
      '@id': `${seoData.siteUrl}/#organization`,
      name: seoData.organization.name,
      url: seoData.organization.url,
      logo: seoData.organization.logo,
      sameAs: seoData.organization.sameAs
    });
  }

  if (meta.schemas.includes('WebSite')) {
    graph.push({
      '@type': 'WebSite',
      '@id': `${seoData.siteUrl}/#website`,
      name: seoData.siteName,
      url: `${seoData.siteUrl}/`,
      publisher: {
        '@id': `${seoData.siteUrl}/#organization`
      },
      inLanguage: seoData.languages
    });
  }

  if (meta.schemas.includes('SoftwareApplication')) {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${seoData.siteUrl}/sxstx-calculator/#software`,
      name: 'SXSTX Calculator',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Web',
      url: calculatorUrl,
      description: meta.description,
      publisher: {
        '@id': `${seoData.siteUrl}/#organization`
      }
    });
  }

  if (meta.schemas.includes('BreadcrumbList')) {
    const itemListElement = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Feiya Studio',
        item: `${seoData.siteUrl}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'SXSTX Calculator',
        item: `${seoData.siteUrl}/sxstx-calculator/`
      }
    ];

    if (route.startsWith(updateArchiveRoute)) {
      itemListElement.push({
        '@type': 'ListItem',
        position: 3,
        name: 'Update Logs',
        item: canonicalUrl(updateArchiveRoute)
      });
    }

    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl(route)}#breadcrumb`,
      itemListElement
    });
  }

  if (meta.schemas.includes('FAQPage')) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${seoData.siteUrl}/sxstx-calculator/#faq`,
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.content
        }
      }))
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
};

const replaceOrInsertMeta = (html, selector, tag) => {
  const property = selector.startsWith('property=') ? 'property' : 'name';
  const value = selector.replace(`${property}=`, '');
  const pattern = new RegExp(`<meta\\s+[^>]*${property}="${value}"[^>]*>`, 'i');

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace('</head>', `    ${tag}\n  </head>`);
};

const renderHead = (html, route, meta) => {
  const alternates = seoData.languages
    .map(
      (language) =>
        `    <link rel="alternate" href="${localizedUrl(route, language)}" hreflang="${language}" />`
    )
    .concat(`    <link rel="alternate" href="${canonicalUrl(route)}" hreflang="x-default" />`)
    .join('\n');
  const jsonLd = JSON.stringify(buildStructuredData(route, meta));

  let output = html
    .replace(/<html lang="[^"]*">/i, '<html lang="en">')
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/i,
      `<link rel="canonical" href="${canonicalUrl(route)}" />`
    )
    .replace(
      /(?:\s*<link rel="alternate" href="[^"]*" hreflang="[^"]*" \/>)+/i,
      `\n${alternates}`
    )
    .replace(/\s*<script type="application\/ld\+json" data-seo-jsonld="true">[\s\S]*?<\/script>/i, '');

  output = replaceOrInsertMeta(
    output,
    'name=description',
    `<meta name="description" content="${escapeXml(meta.description)}" />`
  );
  output = replaceOrInsertMeta(output, 'property=og:type', '<meta property="og:type" content="website" />');
  output = replaceOrInsertMeta(
    output,
    'property=og:site_name',
    `<meta property="og:site_name" content="${seoData.siteName}" />`
  );
  output = replaceOrInsertMeta(
    output,
    'property=og:title',
    `<meta property="og:title" content="${escapeXml(meta.title)}" />`
  );
  output = replaceOrInsertMeta(
    output,
    'property=og:description',
    `<meta property="og:description" content="${escapeXml(meta.description)}" />`
  );
  output = replaceOrInsertMeta(
    output,
    'property=og:url',
    `<meta property="og:url" content="${canonicalUrl(route)}" />`
  );
  output = replaceOrInsertMeta(
    output,
    'property=og:image',
    `<meta property="og:image" content="${seoData.defaultImage}" />`
  );
  output = replaceOrInsertMeta(output, 'name=twitter:card', '<meta name="twitter:card" content="summary_large_image" />');
  output = replaceOrInsertMeta(
    output,
    'name=twitter:title',
    `<meta name="twitter:title" content="${escapeXml(meta.title)}" />`
  );
  output = replaceOrInsertMeta(
    output,
    'name=twitter:description',
    `<meta name="twitter:description" content="${escapeXml(meta.description)}" />`
  );
  output = replaceOrInsertMeta(
    output,
    'name=twitter:image',
    `<meta name="twitter:image" content="${seoData.defaultImage}" />`
  );

  return output.replace(
    '</head>',
    `    <script type="application/ld+json" data-seo-jsonld="true">${jsonLd}</script>\n  </head>`
  );
};

const renderParagraphs = (content) =>
  content
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join('\n');

const renderStaticPortal = () => `    <main class="main-content sxstx-static-content">
      <section class="sxstx-portal-hero" aria-labelledby="sxstx-portal-title">
        <div class="sxstx-portal-hero-copy">
          <p class="eyebrow">Project Portal</p>
          <h1 id="sxstx-portal-title">SXSTX Calculator</h1>
          <p class="sxstx-portal-subtitle">Player-made tools for Sword x Staff.</p>
          <p class="sxstx-portal-intro">SXSTX Calculator is a collection of player-made tools for Sword x Staff, including calculators, update logs, and frequently asked questions.</p>
          <div class="project-actions">
            <a class="action-link action-link-primary" href="${calculatorUrl}">Open Calculator</a>
          </div>
        </div>
      </section>
      <section class="sxstx-portal-section" aria-labelledby="sxstx-about-title">
        <div class="sxstx-portal-section-heading">
          <p class="eyebrow">About</p>
          <h2 id="sxstx-about-title">About</h2>
        </div>
        <div class="sxstx-section-copy">
          <p>SXSTX Calculator is developed by Feiya Studio.</p>
          <p>It provides practical tools for Sword x Staff players, including material calculators, equipment score calculators, and season score planning.</p>
          <p>The calculator is hosted at <a href="${calculatorUrl}">https://sxstx.feiyastudio.com/</a>.</p>
        </div>
      </section>
      <section class="sxstx-portal-section" aria-labelledby="sxstx-update-title">
        <div class="sxstx-portal-section-heading">
          <p class="eyebrow">Update</p>
          <h2 id="sxstx-update-title">Latest Updates</h2>
          <p>Recent SXSTX Calculator project notes from the editable local update log.</p>
        </div>
        <div class="sxstx-update-list">
${updates
  .slice(0, 5)
  .map(
    (update) => `          <article class="sxstx-update-item">
            <p class="sxstx-update-date"><time datetime="${escapeHtml(update.date)}">${escapeHtml(update.date)}</time></p>
            <h3><a href="${escapeHtml(update.route)}">${escapeHtml(update.title)}</a></h3>
            <p>${escapeHtml(update.description)}</p>
          </article>`
  )
  .join('\n')}
          <a class="action-link sxstx-more-link" href="${updateArchiveRoute}">More -&gt;</a>
        </div>
      </section>
      <section class="sxstx-portal-section" aria-labelledby="sxstx-faq-title">
        <div class="sxstx-portal-section-heading">
          <p class="eyebrow">FAQ</p>
          <h2 id="sxstx-faq-title">Frequently Asked Questions</h2>
          <p>Answers to common questions about the SXSTX Calculator project and tools.</p>
        </div>
        <div class="sxstx-faq-list">
${faq
  .map(
    (item) => `          <article class="sxstx-faq-item">
            <h3>${escapeHtml(item.question)}</h3>
            <div class="sxstx-faq-answer">${renderParagraphs(item.content)}</div>
          </article>`
  )
  .join('\n')}
        </div>
      </section>
    </main>`;

const renderStaticUpdateArchive = () => `    <main class="main-content sxstx-static-content">
      <section class="page-intro" aria-labelledby="sxstx-update-archive-title">
        <p class="eyebrow">SXSTX Calculator</p>
        <h1 id="sxstx-update-archive-title">Update Logs</h1>
        <p>All SXSTX Calculator update logs from the local editable Markdown files.</p>
        <div class="project-actions">
          <a class="action-link" href="/sxstx-calculator">Return to the SXSTX Calculator portal</a>
        </div>
      </section>
      <section class="sxstx-portal-section sxstx-archive-section" aria-label="All update logs">
        <div class="sxstx-update-list sxstx-archive-list">
${updates
  .map(
    (update) => `          <article class="sxstx-update-item">
            <p class="sxstx-update-date"><time datetime="${escapeHtml(update.date)}">${escapeHtml(update.date)}</time></p>
            <h2><a href="${escapeHtml(update.route)}">${escapeHtml(update.title)}</a></h2>
            ${renderParagraphs(update.content)}
          </article>`
  )
  .join('\n')}
        </div>
      </section>
    </main>`;

const renderStaticUpdatePost = (update) => `    <main class="main-content sxstx-static-content">
      <article class="page-intro sxstx-update-post" aria-labelledby="sxstx-update-post-title">
        <p class="eyebrow">SXSTX Calculator Update</p>
        <p class="sxstx-update-date"><time datetime="${escapeHtml(update.date)}">${escapeHtml(update.date)}</time></p>
        <h1 id="sxstx-update-post-title">${escapeHtml(update.title)}</h1>
        <p>${escapeHtml(update.description)}</p>
        <div class="project-actions">
          <a class="action-link" href="${updateArchiveRoute}">Return to all SXSTX Calculator update logs</a>
          <a class="action-link" href="/sxstx-calculator">Return to the SXSTX Calculator portal</a>
        </div>
      </article>
      <section class="sxstx-portal-section sxstx-archive-section" aria-label="Update content">
        <div class="sxstx-section-copy sxstx-update-post-body">
          ${renderParagraphs(update.content)}
        </div>
      </section>
    </main>`;

const injectStaticContent = (html, route) => {
  let staticContent = '';

  if (route === '/sxstx-calculator') {
    staticContent = renderStaticPortal();
  } else if (route === updateArchiveRoute) {
    staticContent = renderStaticUpdateArchive();
  } else if (route.startsWith(`${updateArchiveRoute}/`)) {
    const update = updates.find((post) => post.route === route);
    staticContent = update ? renderStaticUpdatePost(update) : '';
  }

  if (!staticContent) {
    return html;
  }

  return html.replace('<div id="root"></div>', `<div id="root">\n${staticContent}\n    </div>`);
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    ([route, meta]) => `  <url>
    <loc>${canonicalUrl(route)}</loc>
    <lastmod>${meta.lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const baseHtml = await readFile(distIndexPath, 'utf8');

for (const [route, meta] of routeEntries.concat(updateRouteEntries)) {
  const html = injectStaticContent(renderHead(baseHtml, route, meta), route);
  const routePath = route === '/' ? distIndexPath : join(distPath, route.slice(1), 'index.html');

  await mkdir(dirname(routePath), { recursive: true });
  await writeFile(routePath, html, 'utf8');
}

await writeFile(join(distPath, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(publicSitemapPath, sitemap, 'utf8');
