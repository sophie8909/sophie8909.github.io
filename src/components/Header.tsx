import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { AppRoute } from '../hooks/useRoute';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  route: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const navItems: Array<
  | { type: 'anchor'; anchor: string; labelKey: string }
  | { type: 'route'; route: AppRoute; labelKey: string }
> = [
  { type: 'anchor', anchor: 'catrodis', labelKey: 'nav.catrodis' },
  { type: 'route', route: '/xingque', labelKey: 'nav.xingque' },
  { type: 'anchor', anchor: 'creations', labelKey: 'nav.creations' }
];

export const Header = ({ route, onNavigate }: HeaderProps) => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (nextRoute: AppRoute) => {
    onNavigate(nextRoute);
    setMenuOpen(false);
  };

  const scrollToAnchor = (anchor: string) => {
    const scroll = () => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(window.history.state, '', `#${anchor}`);
    };

    if (route !== '/') {
      onNavigate('/');
      window.setTimeout(scroll, 80);
    } else {
      scroll();
    }

    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {t('nav.skip')}
      </a>
      <nav className="nav-shell" aria-label={t('nav.label')}>
        <button className="brand-link" type="button" onClick={() => navigate('/')}>
          <span className="brand-glyph" aria-hidden="true">
            <img
              src="/assets/icons/feiya-studio-icon-transparent.png"
              alt=""
              width="38"
              height="38"
            />
          </span>
          <span>Feiya Studio</span>
        </button>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? t('nav.closeShort') : t('nav.menuShort')}
        </button>

        <div className={`nav-content ${menuOpen ? 'nav-content-open' : ''}`} id="primary-navigation">
          <div className="nav-links">
            {navItems.map((item) => (
              <button
                className="nav-link"
                type="button"
                key={item.labelKey}
                aria-current={
                  item.type === 'route' && route.startsWith(item.route) ? 'page' : undefined
                }
                onClick={() =>
                  item.type === 'route' ? navigate(item.route) : scrollToAnchor(item.anchor)
                }
              >
                {t(item.labelKey)}
              </button>
            ))}
          </div>
          <LanguageSelector />
        </div>
      </nav>
    </header>
  );
};
