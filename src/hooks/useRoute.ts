import { useCallback, useEffect, useState } from 'react';

export type AppRoute =
  | '/'
  | '/projects'
  | '/sxstx-calculator'
  | '/sxstx-calculator/blog/update'
  | `/sxstx-calculator/blog/update/${string}`
  | '/xingque'
  | '/xingque/beichen'
  | '/about';

const routeSet = new Set<AppRoute>([
  '/',
  '/projects',
  '/sxstx-calculator',
  '/sxstx-calculator/blog/update',
  '/xingque',
  '/xingque/beichen',
  '/about'
]);

const normalizeRoute = (pathname: string): AppRoute => {
  const withoutTrailingSlash =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (routeSet.has(withoutTrailingSlash as AppRoute)) {
    return withoutTrailingSlash as AppRoute;
  }

  if (withoutTrailingSlash.startsWith('/sxstx-calculator/blog/update/')) {
    return withoutTrailingSlash as AppRoute;
  }

  return '/';
};

const restoreGitHubPagesRoute = (): AppRoute => {
  const url = new URL(window.location.href);
  const redirectedRoute = url.searchParams.get('route');

  if (!redirectedRoute) {
    return normalizeRoute(window.location.pathname);
  }

  const route = normalizeRoute(redirectedRoute);
  url.searchParams.delete('route');
  const query = url.searchParams.toString();
  const cleanUrl = `${route}${query ? `?${query}` : ''}${url.hash}`;

  window.history.replaceState(window.history.state, '', cleanUrl);
  return route;
};

export const useRoute = () => {
  const [route, setRoute] = useState<AppRoute>(() => restoreGitHubPagesRoute());

  useEffect(() => {
    const handlePopState = () => {
      setRoute(normalizeRoute(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((nextRoute: AppRoute) => {
    const currentSearch = new URLSearchParams(window.location.search);
    currentSearch.delete('route');
    const query = currentSearch.toString();
    const nextUrl = `${nextRoute}${query ? `?${query}` : ''}`;

    window.history.pushState({}, '', nextUrl);
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { route, navigate };
};
