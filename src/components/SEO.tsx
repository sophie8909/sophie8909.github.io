import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../i18n/config';
import type { AppRoute } from '../hooks/useRoute';
import { buildStructuredData, getCanonicalUrl, getLocalizedUrl, getRouteSeo, siteSeo } from '../seo/seo';

interface SEOProps {
  route: AppRoute;
}

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
};

const upsertLink = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
};

const upsertJsonLd = (route: AppRoute) => {
  let element = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld="true"]');

  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.dataset.seoJsonld = 'true';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(buildStructuredData(route));
};

const getLocalizedMeta = (
  route: AppRoute,
  language: string,
  meta: { title: string; description: string; lastmod: string; schemas: string[] }
) => {
  if (route === '/xingque' && language.startsWith('zh')) {
    return {
      ...meta,
      title: '星闕 XingQue｜Feiya Studio 分支型工具生態',
      description:
        '星闕 XingQue 是 Feiya Studio 旗下的分支型工具生態。北辰院 Beichen Academy 提供日錄 Rilu 外語日記 Prompt 與晨訊司 Chenxun 週期性新聞學習 Prompt。'
    };
  }

  return meta;
};

export const SEO = ({ route }: SEOProps) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const meta = getLocalizedMeta(route, i18n.language, getRouteSeo(route));
    const canonicalUrl = getCanonicalUrl(route);
    const localizedUrl = getLocalizedUrl(route, i18n.language);

    document.documentElement.lang = i18n.language;
    document.title = meta.title;

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: meta.description
    });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteSeo.siteName });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: meta.description
    });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: localizedUrl });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: siteSeo.defaultImage });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: meta.description
    });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: siteSeo.defaultImage });

    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl
    });

    supportedLanguages.forEach((language) => {
      upsertLink(
        'link[rel="alternate"][hreflang="' + language.code + '"]',
        {
          rel: 'alternate',
          hreflang: language.code,
          href: getLocalizedUrl(route, language.code)
        }
      );
    });

    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: 'alternate',
      hreflang: 'x-default',
      href: canonicalUrl
    });

    upsertJsonLd(route);
  }, [route, i18n.language]);

  return null;
};
