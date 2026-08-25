const UPSTREAM_ORIGIN = 'https://clueless-daily.sophielien09.chatgpt.site';
const PUBLIC_ORIGIN = 'https://clueless.feiyastudio.com';

const ASSET_PATH = /^\/assets\/[A-Za-z0-9._~%/-]+$/;
const API_PATH = '/api/game';
const STATIC_PATHS = new Set([
  '/favicon.svg',
  '/__vite_rsc_findSourceMapURL',
  '/og.png',
]);

function classifyPath(pathname) {
  if (pathname === '/') return 'document';
  if (pathname === API_PATH) return 'api';
  if (STATIC_PATHS.has(pathname) || ASSET_PATH.test(pathname)) return 'asset';
  return null;
}

function methodAllowed(kind, method) {
  if (kind === 'api') return method === 'POST' || method === 'OPTIONS';
  return method === 'GET' || method === 'HEAD';
}

function canonicalUrl(requestUrl) {
  const canonical = new URL(PUBLIC_ORIGIN);
  for (const key of ['seed', 'lang']) {
    const value = requestUrl.searchParams.get(key);
    if (value !== null) canonical.searchParams.set(key, value);
  }
  return canonical.toString();
}

function escapeHtmlAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}

function replacePublicOrigin(text) {
  return text.replaceAll(UPSTREAM_ORIGIN, PUBLIC_ORIGIN);
}

function rewriteHtml(text, publicUrl) {
  let rewritten = replacePublicOrigin(text);
  const escapedUrl = escapeHtmlAttribute(publicUrl);
  const canonicalTag = `<link rel="canonical" href="${escapedUrl}"/>`;
  const openGraphUrlTag = `<meta property="og:url" content="${escapedUrl}"/>`;
  const twitterUrlTag = `<meta name="twitter:url" content="${escapedUrl}"/>`;
  const canonicalPattern = /<link[^>]*rel=["']canonical["'][^>]*>/i;
  const openGraphUrlPattern = /<meta[^>]*property=["']og:url["'][^>]*>/i;
  const twitterUrlPattern = /<meta[^>]*name=["']twitter:url["'][^>]*>/i;

  if (canonicalPattern.test(rewritten)) {
    rewritten = rewritten.replace(canonicalPattern, canonicalTag);
  } else {
    rewritten = rewritten.replace(/<head(\s[^>]*)?>/i, (head) => `${head}${canonicalTag}`);
  }

  if (openGraphUrlPattern.test(rewritten)) {
    rewritten = rewritten.replace(openGraphUrlPattern, openGraphUrlTag);
  } else {
    rewritten = rewritten.replace(canonicalTag, `${canonicalTag}${openGraphUrlTag}`);
  }

  if (twitterUrlPattern.test(rewritten)) {
    rewritten = rewritten.replace(twitterUrlPattern, twitterUrlTag);
  } else {
    rewritten = rewritten.replace(openGraphUrlTag, `${openGraphUrlTag}${twitterUrlTag}`);
  }

  return rewritten;
}

function rewriteLocation(location) {
  if (!location) return location;

  try {
    const target = new URL(location, UPSTREAM_ORIGIN);
    if (target.origin !== UPSTREAM_ORIGIN) return location;
    target.protocol = 'https:';
    target.host = new URL(PUBLIC_ORIGIN).host;
    return target.toString();
  } catch {
    return location;
  }
}

function upstreamHeaders(request) {
  const headers = new Headers(request.headers);
  headers.delete('host');

  if (headers.has('origin')) headers.set('origin', UPSTREAM_ORIGIN);

  const referer = headers.get('referer');
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      if (refererUrl.origin === PUBLIC_ORIGIN) {
        refererUrl.protocol = 'https:';
        refererUrl.host = new URL(UPSTREAM_ORIGIN).host;
        headers.set('referer', refererUrl.toString());
      }
    } catch {
      headers.delete('referer');
    }
  }

  return headers;
}

function rewrittenHeaders(upstreamResponse, kind) {
  const headers = new Headers(upstreamResponse.headers);
  headers.delete('content-length');
  headers.delete('content-encoding');
  headers.delete('etag');
  headers.delete('set-cookie');
  headers.delete('transfer-encoding');

  const location = headers.get('location');
  if (location) headers.set('location', rewriteLocation(location));
  if (kind === 'api') headers.set('cache-control', 'no-store');

  return headers;
}

async function proxyRequest(request) {
  const requestUrl = new URL(request.url);
  const kind = classifyPath(requestUrl.pathname);

  if (!kind) return new Response('Not found', { status: 404 });
  if (!methodAllowed(kind, request.method)) {
    return new Response('Method not allowed', {
      status: 405,
      headers: { allow: kind === 'api' ? 'OPTIONS, POST' : 'GET, HEAD' },
    });
  }

  const target = new URL(requestUrl.pathname, UPSTREAM_ORIGIN);
  target.search = requestUrl.search;
  const requestBody = request.method === 'GET' || request.method === 'HEAD'
    ? undefined
    : await request.arrayBuffer();

  const upstreamRequest = new Request(target, {
    method: request.method,
    headers: upstreamHeaders(request),
    body: requestBody,
    redirect: 'manual',
  });
  const upstreamResponse = await fetch(upstreamRequest);
  const headers = rewrittenHeaders(upstreamResponse, kind);

  if (request.method === 'HEAD' || upstreamResponse.body === null) {
    return new Response(null, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers,
    });
  }

  const contentType = upstreamResponse.headers.get('content-type')?.toLowerCase() ?? '';
  const isHtml = contentType.includes('text/html');
  const isRsc = contentType.includes('text/x-component');
  const isJavaScript = contentType.includes('javascript');

  if (isHtml || isRsc || isJavaScript) {
    const source = await upstreamResponse.text();
    const body = isHtml
      ? rewriteHtml(source, canonicalUrl(requestUrl))
      : replacePublicOrigin(source);
    return new Response(body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers,
    });
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers,
  });
}

export default {
  fetch: proxyRequest,
};

export {
  canonicalUrl,
  classifyPath,
  replacePublicOrigin,
  rewriteHtml,
  rewriteLocation,
};
