import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import i18n, { supportedLanguages } from './i18n/config';
import { useRoute } from './hooks/useRoute';
import { AboutPage } from './pages/AboutPage';
import { ArtCodexPage } from './pages/ArtCodexPage';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';

const siteUrl = 'https://feiyastudio.com';

const routeMetaKeys = {
  '/': { title: 'meta.title', description: 'meta.description' },
  '/projects': { title: 'meta.projectsTitle', description: 'meta.projectsDescription' },
  '/artcodex': { title: 'meta.artcodexTitle', description: 'meta.artcodexDescription' },
  '/about': { title: 'meta.aboutTitle', description: 'meta.aboutDescription' }
} as const;

const upsertMeta = (selector: string, attribute: 'content', value: string) => {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
};

const upsertLink = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
};

function App() {
  const { t } = useTranslation();
  const { route, navigate } = useRoute();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const title = t(routeMetaKeys[route].title);
    const description = t(routeMetaKeys[route].description);
    const path = route === '/' ? '/' : route;
    const localizedPath = `${siteUrl}${path}?lang=${i18n.language}`;

    document.documentElement.lang = i18n.language;
    document.title = title;

    upsertMeta('meta[name="description"]', 'content', description);
    upsertMeta('meta[property="og:title"]', 'content', title);
    upsertMeta('meta[property="og:description"]', 'content', description);
    upsertMeta('meta[property="og:url"]', 'content', localizedPath);
    upsertMeta('meta[name="twitter:title"]', 'content', title);
    upsertMeta('meta[name="twitter:description"]', 'content', description);

    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: localizedPath
    });

    supportedLanguages.forEach((language) => {
      upsertLink(`link[rel="alternate"][hreflang="${language.code}"]`, {
        rel: 'alternate',
        hreflang: language.code,
        href: `${siteUrl}${path}?lang=${language.code}`
      });
    });

    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${siteUrl}${path}`
    });
  }, [route, t]);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, [route]);

  return (
    <div className="app-shell">
      <Header route={route} onNavigate={navigate} />
      <main className="main-content" id="main-content" ref={mainRef} tabIndex={-1}>
        {route === '/' ? <HomePage /> : null}
        {route === '/projects' ? <ProjectsPage /> : null}
        {route === '/artcodex' ? <ArtCodexPage /> : null}
        {route === '/about' ? <AboutPage /> : null}
      </main>
      <Footer />
    </div>
  );
}

export default App;
