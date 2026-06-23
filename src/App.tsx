import { useEffect, useRef } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SEO } from './components/SEO';
import { useRoute } from './hooks/useRoute';
import { AboutPage } from './pages/AboutPage';
import { BeichenPage } from './pages/BeichenPage';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { XingQuePage } from './pages/XingQuePage';

function App() {
  const { route, navigate } = useRoute();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, [route]);

  return (
    <div className="app-shell">
      <SEO route={route} />
      <Header route={route} onNavigate={navigate} />
      <main className="main-content" id="main-content" ref={mainRef} tabIndex={-1}>
        {route === '/' ? <HomePage /> : null}
        {route === '/projects' ? <ProjectsPage /> : null}
        {route === '/xingque' ? <XingQuePage /> : null}
        {route === '/xingque/beichen' ? <BeichenPage /> : null}
        {route === '/about' ? <AboutPage /> : null}
      </main>
      <Footer route={route} />
    </div>
  );
}

export default App;
