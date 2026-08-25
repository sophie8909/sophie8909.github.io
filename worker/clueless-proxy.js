const UPSTREAM_ORIGIN = 'https://clueless-daily.sophielien09.chatgpt.site';
const PUBLIC_ORIGIN = 'https://feiyastudio.com';
const BASE_PATH = '/clueless';
const PUBLIC_BASE = `${PUBLIC_ORIGIN}${BASE_PATH}`;

const ASSET_PATH = /^\/clueless\/assets\/[A-Za-z0-9._~%/-]+$/;
const DOCUMENT_PATHS = new Set([BASE_PATH, `${BASE_PATH}/`]);
const API_PATH = `${BASE_PATH}/api/game`;
const STATIC_PATHS = new Set([
  `${BASE_PATH}/favicon.svg`,
  `${BASE_PATH}/__vite_rsc_findSourceMapURL`,
  `${BASE_PATH}/og.png`,
]);

function classifyPath(pathname) {
  if (DOCUMENT_PATHS.has(pathname)) return 'document';
  if (pathname === API_PATH) return 'api';
  if (STATIC_PATHS.has(pathname) || ASSET_PATH.test(pathname)) return 'asset';
  return null;
}

function methodAllowed(kind, method) {
  if (kind === 'api') return method === 'POST' || method === 'OPTIONS';
  return method === 'GET' || method === 'HEAD';
}

function upstreamPath(pathname) {
  const stripped = pathname.slice(BASE_PATH.length);
  return stripped === '' || stripped === '/' ? '/' : stripped;
}

function canonicalUrl(requestUrl) {
  const canonical = new URL(PUBLIC_BASE);
  for (const key of ['seed', 'lang']) {
    const value = requestUrl.searchParams.get(key);
    if (value !== null) canonical.searchParams.set(key, value);
  }
  return canonical.toString();
}

function escapeHtmlAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}

function replaceScopedPaths(text) {
  let rewritten = text.replaceAll(UPSTREAM_ORIGIN, PUBLIC_BASE);

  for (const quote of ['"', "'", '`']) {
    rewritten = rewritten
      .replaceAll(`${quote}/assets/`, `${quote}${BASE_PATH}/assets/`)
      .replaceAll(`${quote}/api/game`, `${quote}${BASE_PATH}/api/game`)
      .replaceAll(`${quote}/favicon.svg`, `${quote}${BASE_PATH}/favicon.svg`)
      .replaceAll(`${quote}/__vite_rsc_findSourceMapURL`, `${quote}${BASE_PATH}/__vite_rsc_findSourceMapURL`)
      .replaceAll(`${quote}/og.png`, `${quote}${BASE_PATH}/og.png`);
  }

  rewritten = rewritten.replace(/return`\/`\+([A-Za-z_$][\w$]*)/g, `return\`${BASE_PATH}/\`+$1`);
  return rewritten;
}

function rewriteHtml(text, publicUrl) {
  let rewritten = replaceScopedPaths(text);
  const escapedUrl = escapeHtmlAttribute(publicUrl);
  const canonicalTag = `<link rel="canonical" href="${escapedUrl}"/>`;
  const openGraphUrlTag = `<meta property="og:url" content="${escapedUrl}"/>`;
  const canonicalPattern = /<link[^>]*rel=["']canonical["'][^>]*>/i;
  const openGraphUrlPattern = /<meta[^>]*property=["']og:url["'][^>]*>/i;

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

  return rewritten;
}

function rewriteLocation(location) {
  if (!location) return location;

  try {
    const target = new URL(location, UPSTREAM_ORIGIN);
    if (target.origin !== UPSTREAM_ORIGIN) return location;
    target.protocol = 'https:';
    target.host = new URL(PUBLIC_ORIGIN).host;
    target.pathname = `${BASE_PATH}${target.pathname === '/' ? '' : target.pathname}`;
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
      if (refererUrl.origin === PUBLIC_ORIGIN && refererUrl.pathname.startsWith(BASE_PATH)) {
        refererUrl.protocol = 'https:';
        refererUrl.host = new URL(UPSTREAM_ORIGIN).host;
        refererUrl.pathname = upstreamPath(refererUrl.pathname);
        headers.set('referer', refererUrl.toString());
      }
    } catch {
      headers.delete('referer');
    }
  }

  const nextUrl = headers.get('next-url');
  if (nextUrl?.startsWith(BASE_PATH)) {
    headers.set('next-url', upstreamPath(new URL(nextUrl, PUBLIC_ORIGIN).pathname));
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

  if (requestUrl.pathname === `${BASE_PATH}/`) {
    const location = new URL(PUBLIC_BASE);
    location.search = requestUrl.search;
    return Response.redirect(location, 308);
  }

  const target = new URL(upstreamPath(requestUrl.pathname), UPSTREAM_ORIGIN);
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
      : replaceScopedPaths(source);
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
  replaceScopedPaths,
  rewriteHtml,
  rewriteLocation,
  upstreamPath,
};
