import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const distPath = join(root, 'dist');
const adsenseAccountId = 'ca-pub-2263683088830621';
const adsenseScriptUrl =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseAccountId}`;

const removeManagedTags = (html) =>
  html
    .replace(
      /\s*<meta\s+[^>]*name="google-adsense-account"[^>]*>/gi,
      ''
    )
    .replace(
      /\s*<script\s+[^>]*src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^"]*"[^>]*>\s*<\/script>/gi,
      ''
    );

export const renderAdSenseHead = (html, loadAds) => {
  const withoutManagedTags = removeManagedTags(html);
  const accountMeta =
    `    <meta name="google-adsense-account" content="${adsenseAccountId}">\n`;

  if (!withoutManagedTags.includes('</head>')) {
    throw new Error('Cannot inject AdSense tags into HTML without a closing head element.');
  }

  if (!loadAds) {
    return withoutManagedTags.replace('</head>', accountMeta + '  </head>');
  }

  return withoutManagedTags.replace(
    '</head>',
    accountMeta +
      `    <script async src="${adsenseScriptUrl}"\n` +
      '      crossorigin="anonymous"></script>\n' +
      '  </head>'
  );
};

const collectHtmlFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? collectHtmlFiles(path) : [path];
    })
  );

  return files.flat().filter((path) => path.endsWith('.html'));
};

const htmlFiles = await collectHtmlFiles(distPath);

for (const htmlPath of htmlFiles) {
  const relativePath = relative(distPath, htmlPath).replaceAll('\\', '/');

  if (relativePath === '404.html' || relativePath.endsWith('/404.html')) {
    continue;
  }

  const html = await readFile(htmlPath, 'utf8');
  const output = renderAdSenseHead(html, relativePath !== 'index.html');

  if (output !== html) {
    await writeFile(htmlPath, output, 'utf8');
  }
}
