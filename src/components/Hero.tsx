import { useTranslation } from 'react-i18next';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true">
        <span className="geo-line geo-line-horizontal" />
        <span className="geo-line geo-line-vertical" />
        <span className="geo-shape geo-square" />
        <span className="geo-shape geo-circle" />
        <span className="geo-shape geo-diamond" />
        <span className="geo-shape geo-triangle" />
      </div>

      <div className="hero-inner">
        <h1 id="hero-title">FEIYA STUDIO</h1>
        <p className="hero-subtitle">{t('hero.subtitle')}</p>
      </div>
    </section>
  );
};
