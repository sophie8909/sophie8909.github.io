import { useTranslation } from 'react-i18next';

export const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="page-shell">
      <section className="page-intro" aria-labelledby="about-page-title">
        <p className="eyebrow">{t('aboutPage.eyebrow')}</p>
        <h1 id="about-page-title">{t('aboutPage.heading')}</h1>
      </section>
    </div>
  );
};
