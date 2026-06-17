import { useEffect, useRef } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SEO } from './components/SEO';
import { useRoute } from './hooks/useRoute';
import { AboutPage } from './pages/AboutPage';
import { ArtCodexPage } from './pages/ArtCodexPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';

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
        {route === '/ArtCodex' ? <ArtCodexPage /> : null}
        {route === '/calculator' ? <CalculatorPage /> : null}
        {route === '/about' ? <AboutPage /> : null}
      </main>
      <Footer />
    </div>
  );
}

export default App;
