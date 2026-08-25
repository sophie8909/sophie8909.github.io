import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const distPath = join(root, 'dist');
const sitemapPath = join(distPath, 'sitemap.xml');
const robotsPath = join(distPath, 'robots.txt');

const expectedUrls = [
  'https://feiyastudio.com/',
  'https://feiyastudio.com/projects/',
  'https://feiyastudio.com/sxstx-calculator/',
  'https://feiyastudio.com/sxstx-calculator/blog/update/',
  'https://feiyastudio.com/xingque/',
  'https://feiyastudio.com/xingque/beichen/',
  'https://feiyastudio.com/about/',
  'https://feiyastudio.com/sxstx-calculator/blog/update/2026-07-19/',
  'https://feiyastudio.com/sxstx-calculator/blog/update/2026-07-08/'
];

const readCanonical = async (route) => {
  const htmlPath = route === '/' ? join(distPath, 'index.html') : join(distPath, route.slice(1), 'index.html');
  const html = await readFile(htmlPath, 'utf8');
  const match = html.match(/<link rel="canonical" href="([^"]+)"\s*\/?\s*>/i);

  assert.ok(match, `canonical link should exist in ${htmlPath}`);
  return match[1];
};

test('production output contains a real static sitemap and robots file', async () => {
  const sitemapStats = await stat(sitemapPath);
  const robotsStats = await stat(robotsPath);

  assert.ok(sitemapStats.isFile());
  assert.ok(robotsStats.isFile());

  const sitemap = await readFile(sitemapPath, 'utf8');
  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>\s*<urlset\b/);
  assert.doesNotMatch(sitemap, /<div id="root">/);
  assert.doesNotMatch(sitemap, /<changefreq>|<priority>/);
});

test('main-site sitemap contains exactly the canonical public route set', async () => {
  const sitemap = await readFile(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  assert.deepEqual(urls, expectedUrls);
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(urls.includes('https://feiyastudio.com/sxstx-calculator/'));
  assert.ok(!urls.includes('https://feiyastudio.com/sxstx_calculator/'));
  assert.ok(urls.every((url) => new URL(url).hostname === 'feiyastudio.com'));
  assert.ok(!sitemap.includes('https://sxstx.feiyastudio.com/'));

  const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
  assert.equal(lastmods.length, urls.length);
  assert.ok(lastmods.every((date) => /^\d{4}-\d{2}-\d{2}$/.test(date)));
});

test('robots.txt points crawlers at the main-site sitemap', async () => {
  const robots = await readFile(robotsPath, 'utf8');

  assert.equal(
    robots.trim(),
    ['User-agent: *', 'Allow: /', '', 'Sitemap: https://feiyastudio.com/sitemap.xml'].join('\n')
  );
});

test('generated HTML has the required canonicals and crawlable calculator link', async () => {
  assert.equal(await readCanonical('/'), 'https://feiyastudio.com/');
  assert.equal(
    await readCanonical('/sxstx-calculator'),
    'https://feiyastudio.com/sxstx-calculator/'
  );

  const calculatorHtml = await readFile(join(distPath, 'sxstx-calculator', 'index.html'), 'utf8');
  assert.match(
    calculatorHtml,
    /<a\b[^>]*href="https:\/\/sxstx\.feiyastudio\.com\/"[^>]*>https:\/\/sxstx\.feiyastudio\.com\/<\/a>/
  );
});
