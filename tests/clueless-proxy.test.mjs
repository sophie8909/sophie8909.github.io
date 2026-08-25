import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { after, test } from 'node:test';

import worker from '../worker/clueless-proxy.js';

const nativeFetch = globalThis.fetch;

after(() => {
  globalThis.fetch = nativeFetch;
});

async function withFetchStub(stub, callback) {
  globalThis.fetch = stub;
  try {
    return await callback();
  } finally {
    globalThis.fetch = nativeFetch;
  }
}

test('maps the root document to the fixed upstream and preserves seed and language', async () => {
  let capturedRequest;
  const response = await withFetchStub(
    async (request) => {
      capturedRequest = request;
      return new Response('<html><head></head><body></body></html>', {
        headers: { 'content-type': 'text/html; charset=utf-8' },
      });
    },
    () => worker.fetch(new Request('https://clueless.feiyastudio.com/?seed=example&lang=zh')),
  );

  assert.equal(capturedRequest.url, 'https://clueless-daily.sophielien09.chatgpt.site/?seed=example&lang=zh');
  assert.equal(response.status, 200);
});

test('keeps root assets and rewrites canonical, Open Graph, and Twitter metadata', async () => {
  const upstreamHtml = [
    '<!doctype html><html><head>',
    '<link rel="stylesheet" href="/assets/game.css">',
    '<meta property="og:image" content="https://clueless-daily.sophielien09.chatgpt.site/og.png">',
    '</head><body><script src="/assets/game.js"></script></body></html>',
  ].join('');

  const response = await withFetchStub(
    async () => new Response(upstreamHtml, { headers: { 'content-type': 'text/html' } }),
    () => worker.fetch(new Request('https://clueless.feiyastudio.com/?tracking=ignored&lang=zh&seed=my+puzzle')),
  );
  const html = await response.text();

  assert.match(html, /href="\/assets\/game\.css"/);
  assert.match(html, /src="\/assets\/game\.js"/);
  assert.match(html, /https:\/\/clueless\.feiyastudio\.com\/og\.png/);
  assert.match(html, /rel="canonical" href="https:\/\/clueless\.feiyastudio\.com\/?\?seed=my\+puzzle&amp;lang=zh"/);
  assert.match(html, /property="og:url" content="https:\/\/clueless\.feiyastudio\.com\/?\?seed=my\+puzzle&amp;lang=zh"/);
  assert.match(html, /name="twitter:url" content="https:\/\/clueless\.feiyastudio\.com\/?\?seed=my\+puzzle&amp;lang=zh"/);
  assert.match(html, /<script defer src="\/feiya-integration\.js"><\/script>/);
  assert.doesNotMatch(html, /chatgpt\.site/);
  assert.doesNotMatch(html, /tracking=ignored/);
});

test('keeps browser API and Vinext runtime paths at the subdomain root', async () => {
  const upstreamJavaScript = [
    'fetch(`/api/game`);',
    'new URL(`/__vite_rsc_findSourceMapURL`,import.meta.url);',
    'function prefix(asset){return`/`+asset}',
    'const origin="https://clueless-daily.sophielien09.chatgpt.site";',
  ].join('');
  const response = await withFetchStub(
    async () => new Response(upstreamJavaScript, { headers: { 'content-type': 'application/javascript' } }),
    () => worker.fetch(new Request('https://clueless.feiyastudio.com/assets/game-123.js')),
  );

  const javascript = await response.text();
  assert.match(javascript, /fetch\(`\/api\/game`\)/);
  assert.match(javascript, /new URL\(`\/__vite_rsc_findSourceMapURL`/);
  assert.match(javascript, /return`\/`\+asset/);
  assert.match(javascript, /https:\/\/clueless\.feiyastudio\.com/);
  assert.doesNotMatch(javascript, /chatgpt\.site/);
});

test('forwards API bodies server-side and disables caching', async () => {
  let capturedRequest;
  const body = JSON.stringify({ action: 'guess', word: 'water', seed: 'example', language: 'en' });
  const response = await withFetchStub(
    async (request) => {
      capturedRequest = request;
      return Response.json(
        { distance: 42, solved: false },
        { headers: { 'set-cookie': 'private=value' } },
      );
    },
    () => worker.fetch(new Request('https://clueless.feiyastudio.com/api/game', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'https://clueless.feiyastudio.com',
        referer: 'https://clueless.feiyastudio.com/?seed=example&lang=en',
      },
      body,
    })),
  );

  assert.equal(capturedRequest.url, 'https://clueless-daily.sophielien09.chatgpt.site/api/game');
  assert.equal(capturedRequest.headers.get('origin'), 'https://clueless-daily.sophielien09.chatgpt.site');
  assert.equal(
    capturedRequest.headers.get('referer'),
    'https://clueless-daily.sophielien09.chatgpt.site/?seed=example&lang=en',
  );
  assert.equal(await capturedRequest.text(), body);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('set-cookie'), null);
  assert.deepEqual(await response.json(), { distance: 42, solved: false });
});

test('preserves RSC headers and root asset paths', async () => {
  let capturedRequest;
  const response = await withFetchStub(
    async (request) => {
      capturedRequest = request;
      return new Response('1:["/assets/game.js","https://clueless-daily.sophielien09.chatgpt.site/og.png"]', {
        headers: { 'content-type': 'text/x-component' },
      });
    },
    () => worker.fetch(new Request('https://clueless.feiyastudio.com/?seed=rsc', {
      headers: {
        rsc: '1',
        'next-router-state-tree': 'state',
        'next-url': '/',
      },
    })),
  );

  assert.equal(capturedRequest.headers.get('rsc'), '1');
  assert.equal(capturedRequest.headers.get('next-router-state-tree'), 'state');
  assert.equal(capturedRequest.headers.get('next-url'), '/');
  assert.equal(
    await response.text(),
    '1:["/assets/game.js","https://clueless.feiyastudio.com/og.png"]',
  );
});

test('proxies the exact Vinext source-map endpoint without broadening the allowlist', async () => {
  let capturedRequest;
  const response = await withFetchStub(
    async (request) => {
      capturedRequest = request;
      return new Response('Not Found', { status: 404 });
    },
    () => worker.fetch(new Request(
      'https://clueless.feiyastudio.com/__vite_rsc_findSourceMapURL?filename=test&environmentName=client',
    )),
  );

  assert.equal(response.status, 404);
  assert.equal(
    capturedRequest.url,
    'https://clueless-daily.sophielien09.chatgpt.site/__vite_rsc_findSourceMapURL?filename=test&environmentName=client',
  );
});

test('rewrites upstream redirects without leaving the CLUELESS subdomain', async () => {
  const response = await withFetchStub(
    async () => new Response(null, {
      status: 307,
      headers: { location: 'https://clueless-daily.sophielien09.chatgpt.site/?seed=redirected&lang=en' },
    }),
    () => worker.fetch(new Request('https://clueless.feiyastudio.com/')),
  );

  assert.equal(
    response.headers.get('location'),
    'https://clueless.feiyastudio.com/?seed=redirected&lang=en',
  );
});

test('rejects unrelated paths and unsupported methods without an upstream fetch', async () => {
  let fetchCount = 0;
  await withFetchStub(
    async () => {
      fetchCount += 1;
      return new Response('unexpected');
    },
    async () => {
      const oldSubpath = await worker.fetch(new Request('https://clueless.feiyastudio.com/clueless'));
      const disguisedProxy = await worker.fetch(new Request('https://clueless.feiyastudio.com/proxy?url=https://example.com'));
      const badMethod = await worker.fetch(new Request('https://clueless.feiyastudio.com/assets/game.js', { method: 'POST' }));

      assert.equal(oldSubpath.status, 404);
      assert.equal(disguisedProxy.status, 404);
      assert.equal(badMethod.status, 405);
      assert.equal(badMethod.headers.get('allow'), 'GET, HEAD');
    },
  );

  assert.equal(fetchCount, 0);
});

test('serves a scoped BMC and privacy-conscious GA4 integration without an upstream fetch', async () => {
  let fetchCount = 0;
  const response = await withFetchStub(
    async () => {
      fetchCount += 1;
      return new Response('unexpected');
    },
    () => worker.fetch(new Request('https://clueless.feiyastudio.com/feiya-integration.js')),
  );
  const script = await response.text();

  assert.equal(fetchCount, 0);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'text/javascript; charset=utf-8');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.doesNotThrow(() => new Function(script));
  assert.match(script, /G-EPGN73HBMP/);
  assert.match(script, /https:\/\/www\.buymeacoffee\.com\/feiyastudio/);
  assert.match(script, /page_location: window\.location\.origin \+ window\.location\.pathname/);
  assert.doesNotMatch(script, /window\.location\.search/);
  assert.doesNotMatch(script, /guess|word|answer/i);
});

test('lists CLUELESS as a complete localized Feiya Studio creation', async () => {
  const creations = JSON.parse(
    await readFile(new URL('../src/data/creations.json', import.meta.url), 'utf8'),
  );
  const clueless = creations.find((creation) => creation.id === 'clueless');

  assert.ok(clueless);
  assert.deepEqual(Object.keys(clueless.title).sort(), ['en', 'zh-CN', 'zh-TW']);
  assert.deepEqual(Object.keys(clueless.subtitle).sort(), ['en', 'zh-CN', 'zh-TW']);
  assert.deepEqual(Object.keys(clueless.description).sort(), ['en', 'zh-CN', 'zh-TW']);
  assert.equal(clueless.buttons[0].href, 'https://clueless.feiyastudio.com/');
  assert.equal(clueless.buttons[0].clickable, true);
  assert.equal(new Set(creations.map((creation) => creation.id)).size, creations.length);
});
