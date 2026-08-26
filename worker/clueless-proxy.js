const UPSTREAM_ORIGIN = 'https://clueless-daily.sophielien09.chatgpt.site';
const PUBLIC_ORIGIN = 'https://clueless.feiyastudio.com';
const FEIYA_INTEGRATION_PATH = '/feiya-integration.js';
const ADS_TXT_PATH = '/ads.txt';
const GA_MEASUREMENT_ID = 'G-EPGN73HBMP';
const BUY_ME_A_COFFEE_URL = 'https://www.buymeacoffee.com/feiyastudio';
const ADSENSE_ACCOUNT_ID = 'ca-pub-2263683088830621';
const ADSENSE_PUBLISHER_RECORD = 'google.com, pub-2263683088830621, DIRECT, f08c47fec0942fa0';
const ADSENSE_SCRIPT_URL =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ACCOUNT_ID}`;

const FEIYA_INTEGRATION_SCRIPT = `
(() => {
  const measurementId = '${GA_MEASUREMENT_ID}';
  const supportUrl = '${BUY_ME_A_COFFEE_URL}';
  const integrationId = 'feiya-clueless-integration';

  const initializeAnalytics = () => {
    if (window.__feiyaCluelessGa4) return;
    window.__feiyaCluelessGa4 = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_location: window.location.origin + window.location.pathname,
      page_title: document.title,
    });

    if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      const analyticsScript = document.createElement('script');
      analyticsScript.async = true;
      analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
      document.head.append(analyticsScript);
    }
  };

  const addSupportLinks = () => {
    if (document.getElementById(integrationId)) return;

    const style = document.createElement('style');
    style.textContent = '.feiya-clueless-support{display:flex;align-items:center;justify-content:center;gap:.65rem;flex-wrap:wrap;padding:1rem;color:#6f6259;border-top:1px solid rgba(111,98,89,.2);font:500 .78rem/1.4 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}.feiya-clueless-support a{display:inline-flex;align-items:center;min-height:44px;color:#744a47;text-underline-offset:.2em}.feiya-clueless-support span{opacity:.55}';
    document.head.append(style);

    const support = document.createElement('aside');
    support.id = integrationId;
    support.className = 'feiya-clueless-support';
    support.setAttribute('aria-label', document.documentElement.lang.startsWith('zh') ? 'Feiya Studio 支持連結' : 'Feiya Studio support links');

    const studioLink = document.createElement('a');
    studioLink.href = 'https://feiyastudio.com/';
    studioLink.textContent = 'Feiya Studio';

    const separator = document.createElement('span');
    separator.setAttribute('aria-hidden', 'true');
    separator.textContent = '·';

    const supportLink = document.createElement('a');
    supportLink.href = supportUrl;
    supportLink.target = '_blank';
    supportLink.rel = 'noreferrer';
    supportLink.textContent = 'Buy Me a Coffee';

    support.append(studioLink, separator, supportLink);
    document.body.append(support);
  };

  initializeAnalytics();
  const scheduleSupportLinks = () => window.setTimeout(addSupportLinks, 0);
  if (document.readyState === 'complete') scheduleSupportLinks();
  else window.addEventListener('load', scheduleSupportLinks, { once: true });
})();
`;

const ASSET_PATH = /^\/assets\/[A-Za-z0-9._~%/-]+$/;
const API_PATH = '/api/game';
const STATIC_PATHS = new Set([
  '/favicon.svg',
  '/__vite_rsc_findSourceMapURL',
  '/og.png',
  FEIYA_INTEGRATION_PATH,
  ADS_TXT_PATH,
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

function injectAdSenseHead(html) {
  const withoutManagedTags = html
    .replace(/\s*<meta\b(?=[^>]*\bname=["']google-adsense-account["'])[^>]*>/gi, '')
    .replace(
      /\s*<script\b[^>]*\bsrc=["']https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^"']*["'][^>]*>\s*<\/script\s*>/gi,
      '',
    );
  const adsenseTags =
    `<meta name="google-adsense-account" content="${ADSENSE_ACCOUNT_ID}">` +
    `<script async src="${ADSENSE_SCRIPT_URL}" crossorigin="anonymous"></script>`;

  return withoutManagedTags.replace(/<\/head>/i, `${adsenseTags}</head>`);
}

function rewriteHtml(text, publicUrl) {
  let rewritten = injectAdSenseHead(replacePublicOrigin(text));
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

  const integrationTag = `<script defer src="${FEIYA_INTEGRATION_PATH}"></script>`;
  if (!rewritten.includes(integrationTag)) {
    rewritten = rewritten.replace('</head>', `${integrationTag}</head>`);
  }

  return rewritten;
}

function integrationResponse(method) {
  return new Response(method === 'HEAD' ? null : FEIYA_INTEGRATION_SCRIPT, {
    headers: {
      'cache-control': 'public, max-age=3600',
      'content-type': 'text/javascript; charset=utf-8',
      'x-content-type-options': 'nosniff',
    },
  });
}

function adsTxtResponse(method) {
  return new Response(method === 'HEAD' ? null : `${ADSENSE_PUBLISHER_RECORD}\n`, {
    headers: {
      'cache-control': 'public, max-age=3600',
      'content-type': 'text/plain; charset=utf-8',
      'x-content-type-options': 'nosniff',
    },
  });
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
  if (requestUrl.pathname === FEIYA_INTEGRATION_PATH) {
    return integrationResponse(request.method);
  }
  if (requestUrl.pathname === ADS_TXT_PATH) {
    return adsTxtResponse(request.method);
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
