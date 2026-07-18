import seoData from './seoData.json';
import type { AppRoute } from '../hooks/useRoute';
import { calculatorUrl, faq, updates } from '../data/sxstxContent';

type SchemaType = 'Organization' | 'WebSite' | 'SoftwareApplication' | 'BreadcrumbList' | 'FAQPage';

interface RouteSeo {
  title: string;
  description: string;
  lastmod: string;
  schemas: SchemaType[];
}

export const siteSeo = seoData;
export const routeSeo = seoData.routes as Partial<Record<AppRoute, RouteSeo>>;

const defaultRouteSeo = routeSeo['/'] as RouteSeo;

export const getRouteSeo = (route: AppRoute): RouteSeo => {
  const exactMeta = routeSeo[route];

  if (exactMeta) {
    return exactMeta;
  }

  if (route.startsWith('/sxstx-calculator/blog/update/')) {
    const update = updates.find((post) => post.route === route);

    return {
      title: update
        ? `${update.title} | SXSTX Calculator | Feiya Studio`
        : 'SXSTX Calculator Update | Feiya Studio',
      description: update?.description ?? 'Read an SXSTX Calculator update from Feiya Studio.',
      lastmod: update?.date ?? '2026-07-10',
      schemas: ['WebSite', 'BreadcrumbList']
    };
  }

  return defaultRouteSeo;
};

export const getCanonicalUrl = (route: AppRoute) => {
  const canonicalPath = route === '/' ? '/' : `${route.replace(/\/+$/, '')}/`;
  return `${seoData.siteUrl}${canonicalPath}`;
};

export const getLocalizedUrl = (route: AppRoute, language: string) => {
  const canonical = getCanonicalUrl(route);
  return `${canonical}?lang=${language}`;
};

export const buildStructuredData = (route: AppRoute) => {
  const meta = getRouteSeo(route);
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
      url: `${seoData.siteUrl}/`,
      publisher: {
        '@id': `${seoData.siteUrl}/#organization`
      },
      inLanguage: seoData.languages
    });
  }

  if (meta.schemas.includes('SoftwareApplication')) {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${seoData.siteUrl}/sxstx-calculator/#software`,
      name: 'SXSTX Calculator',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Web',
      url: calculatorUrl,
      description: meta.description,
      publisher: {
        '@id': `${seoData.siteUrl}/#organization`
      }
    });
  }

  if (meta.schemas.includes('BreadcrumbList')) {
    const itemListElement = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Feiya Studio',
        item: `${seoData.siteUrl}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'SXSTX Calculator',
        item: `${seoData.siteUrl}/sxstx-calculator/`
      }
    ];

    if (route.startsWith('/sxstx-calculator/blog/update')) {
      itemListElement.push({
        '@type': 'ListItem',
        position: 3,
        name: 'Update Logs',
        item: `${seoData.siteUrl}/sxstx-calculator/blog/update/`
      });
    }

    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${getCanonicalUrl(route)}#breadcrumb`,
      itemListElement
    });
  }

  if (meta.schemas.includes('FAQPage')) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${seoData.siteUrl}/sxstx-calculator/#faq`,
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.content
        }
      }))
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
};
