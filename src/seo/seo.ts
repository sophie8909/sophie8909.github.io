import seoData from './seoData.json';
import type { AppRoute } from '../hooks/useRoute';

type SchemaType = 'Organization' | 'WebSite';

interface RouteSeo {
  title: string;
  description: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  schemas: SchemaType[];
}

export const siteSeo = seoData;
export const routeSeo = seoData.routes as Record<AppRoute, RouteSeo>;

export const getCanonicalUrl = (route: AppRoute) =>
  `${seoData.siteUrl}${route === '/' ? '/' : route}`;

export const getLocalizedUrl = (route: AppRoute, language: string) => {
  const canonical = getCanonicalUrl(route);
  return `${canonical}${route === '/' ? '' : ''}?lang=${language}`;
};

export const buildStructuredData = (route: AppRoute) => {
  const meta = routeSeo[route];
  const graph: Array<Record<string, unknown>> = [];

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
