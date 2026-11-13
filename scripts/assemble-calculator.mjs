import { cp, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const source = process.argv[2];
if (!source) throw new Error('Provide the calculator build directory.');

const dist = new URL('../dist/', import.meta.url);
const oldOrigin = 'https://sxstx.feiyastudio.com';
const newOrigin = 'https://feiyastudio.com';

const sourceAssets = join(source, 'assets');
for (const asset of await readdir(sourceAssets)) {
  await cp(join(sourceAssets, asset), new URL(`assets/${asset}`, dist), {
    recursive: true,
    force: false,
    errorOnExist: true
  });
}

for (const page of ['index.html', 'submit-target-time.html']) {
  let html = (await readFile(join(source, page), 'utf8')).replaceAll(oldOrigin, newOrigin);

  if (page === 'index.html') {
    const favicon = html.match(/<link rel="icon"[^>]* href="([^"]+)"/)?.[1];
    if (!favicon) throw new Error('The calculator build must include a favicon.');
    html = html.replaceAll('/images/favicon_v1.png', favicon);
    const studioLink = '<a href="/home/">Feiya Studio</a>';
    html = html.replace(/<footer\b[^>]*>/, (footer) => `${footer}\n      <p>${studioLink}</p>`);
    if (!html.includes(studioLink)) throw new Error('The calculator build must include a footer.');
  }

  await writeFile(new URL(page, dist), html);
}
