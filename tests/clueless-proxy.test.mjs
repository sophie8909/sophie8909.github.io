import assert from 'node:assert/strict';
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

test('maps the document to the fixed upstream and preserves seed and language', async () => {
  let capturedRequest;
  const response = await withFetchStub(
    async (request) => {
      capturedRequest = request;
      return new Response('<html><head></head><body></body></html>', {
        headers: { 'content-type': 'text/html; charset=utf-8' },
      });
    },
    () => worker.fetch(new Request('https://feiyastudio.com/clueless?seed=example&lang=zh')),
  );

  assert.equal(capturedRequest.url, 'https://clueless-daily.sophielien09.chatgpt.site/?seed=example&lang=zh');
  assert.equal(response.status, 200);
});

test('rewrites HTML assets, metadata, and public origin under the subpath', async () => {
  const upstreamHtml = [
    '<!doctype html><html><head>',
    '<link rel="stylesheet" href="/assets/game.css">',
    '<meta property="og:image" content="https://clueless-daily.sophielien09.chatgpt.site/og.png">',
    '</head><body><script src="/assets/game.js"></script></body></html>',
  ].join('');

  const response = await withFetchStub(
    async () => new Response(upstreamHtml, { headers: { 'content-type': 'text/html' } }),
    () => worker.fetch(new Request('https://feiyastudio.com/clueless?tracking=ignored&lang=zh&seed=my+puzzle')),
  );
  const html = await response.text();

  assert.match(html, /href="\/clueless\/assets\/game\.css"/);
  assert.match(html, /src="\/clueless\/assets\/game\.js"/);
  assert.match(html, /https:\/\/feiyastudio\.com\/clueless\/og\.png/);
  assert.match(html, /rel="canonical" href="https:\/\/feiyastudio\.com\/clueless\?seed=my\+puzzle&amp;lang=zh"/);
  assert.match(html, /property="og:url" content="https:\/\/feiyastudio\.com\/clueless\?seed=my\+puzzle&amp;lang=zh"/);
  assert.doesNotMatch(html, /chatgpt\.site/);
  assert.doesNotMatch(html, /tracking=ignored/);
});

test('rewrites browser API and Vinext runtime paths in JavaScript bundles', async () => {
  const upstreamJavaScript = [
    'fetch(`/api/game`);',
    'new URL(`/__vite_rsc_findSourceMapURL`,import.meta.url);',
    'function prefix(asset){return`/`+asset}',
  ].join('');
  const response = await withFetchStub(
    async () => new Response(upstreamJavaScript, { headers: { 'content-type': 'application/javascript' } }),
    () => worker.fetch(new Request('https://feiyastudio.com/clueless/assets/game-123.js')),
  );

  const javascript = await response.text();
  assert.match(javascript, /fetch\(`\/clueless\/api\/game`\)/);
  assert.match(javascript, /new URL\(`\/clueless\/__vite_rsc_findSourceMapURL`/);
  assert.match(javascript, /return`\/clueless\/`\+asset/);
});

test('forwards API bodies server-side and disables caching', async () => {
  let capturedRequest;
  const body = JSON.stringify({ action: 'guess', word: 'water', seed: 'example', language: 'en' });
  const response = await withFetchStub(
    async (request) => {
      capturedRequest = request;
      return Response.json({ distance: 42, solved: false });
    },
    () => worker.fetch(new Request('https://feiyastudio.com/clueless/api/game', {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://feiyastudio.com' },
      body,
    })),
  );

  assert.equal(capturedRequest.url, 'https://clueless-daily.sophielien09.chatgpt.site/api/game');
  assert.equal(capturedRequest.headers.get('origin'), 'https://clueless-daily.sophielien09.chatgpt.site');
  assert.equal(await capturedRequest.text(), body);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { distance: 42, solved: false });
});

test('preserves RSC headers while remapping Next-Url and response asset paths', async () => {
  let capturedRequest;
  const response = await withFetchStub(
    async (request) => {
      capturedRequest = request;
      return new Response('1:["/assets/game.js","https://clueless-daily.sophielien09.chatgpt.site/og.png"]', {
        headers: { 'content-type': 'text/x-component' },
      });
    },
    () => worker.fetch(new Request('https://feiyastudio.com/clueless?seed=rsc', {
      headers: {
        rsc: '1',
        'next-router-state-tree': 'state',
        'next-url': '/clueless',
      },
    })),
  );

  assert.equal(capturedRequest.headers.get('rsc'), '1');
  assert.equal(capturedRequest.headers.get('next-router-state-tree'), 'state');
  assert.equal(capturedRequest.headers.get('next-url'), '/');
  assert.equal(
    await response.text(),
    '1:["/clueless/assets/game.js","https://feiyastudio.com/clueless/og.png"]',
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
      'https://feiyastudio.com/clueless/__vite_rsc_findSourceMapURL?filename=test&environmentName=client',
    )),
  );

  assert.equal(response.status, 404);
  assert.equal(
    capturedRequest.url,
    'https://clueless-daily.sophielien09.chatgpt.site/__vite_rsc_findSourceMapURL?filename=test&environmentName=client',
  );
});

test('canonicalizes the trailing slash without leaving Feiya Studio', async () => {
  const response = await withFetchStub(
    async () => new Response('unexpected'),
    () => worker.fetch(new Request('https://feiyastudio.com/clueless/?lang=zh&seed=example')),
  );

  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get('location'),
    'https://feiyastudio.com/clueless?lang=zh&seed=example',
  );
});

test('rewrites upstream redirects without leaving Feiya Studio', async () => {
  const response = await withFetchStub(
    async () => new Response(null, {
      status: 307,
      headers: { location: 'https://clueless-daily.sophielien09.chatgpt.site/?seed=redirected&lang=en' },
    }),
    () => worker.fetch(new Request('https://feiyastudio.com/clueless')),
  );

  assert.equal(response.headers.get('location'), 'https://feiyastudio.com/clueless?seed=redirected&lang=en');
});

test('rejects unrelated paths and unsupported methods without an upstream fetch', async () => {
  let fetchCount = 0;
  await withFetchStub(
    async () => {
      fetchCount += 1;
      return new Response('unexpected');
    },
    async () => {
      const unrelated = await worker.fetch(new Request('https://feiyastudio.com/'));
      const disguisedProxy = await worker.fetch(new Request('https://feiyastudio.com/clueless/proxy?url=https://example.com'));
      const badMethod = await worker.fetch(new Request('https://feiyastudio.com/clueless/assets/game.js', { method: 'POST' }));

      assert.equal(unrelated.status, 404);
      assert.equal(disguisedProxy.status, 404);
      assert.equal(badMethod.status, 405);
      assert.equal(badMethod.headers.get('allow'), 'GET, HEAD');
    },
  );

  assert.equal(fetchCount, 0);
});
