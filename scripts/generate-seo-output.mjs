import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const seoDataPath = join(root, 'src', 'seo', 'seoData.json');
const distPath = join(root, 'dist');
const publicSitemapPath = join(root, 'public', 'sitemap.xml');
const distIndexPath = join(distPath, 'index.html');

const seoData = JSON.parse(await readFile(seoDataPath, 'utf8'));
const routeEntries = Object.entries(seoData.routes);

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const canonicalUrl = (route) => `${seoData.siteUrl}${route === '/' ? '/' : route}`;
const localizedUrl = (route, language) => `${canonicalUrl(route)}?lang=${language}`;

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
      url: seoData.siteUrl,
      publisher: {
        '@id': `${seoData.siteUrl}/#organization`
      },
      inLanguage: seoData.languages
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

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${routeEntries
  .map(([route, meta]) => `  <url>
    <loc>${canonicalUrl(route)}</loc>
    <lastmod>${meta.lastmod}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
${seoData.languages
  .map(
    (language) =>
      `    <xhtml:link rel="alternate" hreflang="${language}" href="${localizedUrl(route, language)}" />`
  )
  .join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalUrl(route)}" />
  </url>`)
  .join('\n')}
</urlset>
`;

const baseHtml = await readFile(distIndexPath, 'utf8');

for (const [route, meta] of routeEntries) {
  const html = renderHead(baseHtml, route, meta);
  const routePath = route === '/' ? distIndexPath : join(distPath, route.slice(1), 'index.html');

  await mkdir(dirname(routePath), { recursive: true });
  await writeFile(routePath, html, 'utf8');
}

await writeFile(join(distPath, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(publicSitemapPath, sitemap, 'utf8');
