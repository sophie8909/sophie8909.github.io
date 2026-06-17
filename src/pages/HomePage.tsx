import { useTranslation } from 'react-i18next';
import { FeaturedProject } from '../components/FeaturedProject';
import { Hero } from '../components/Hero';
import { SupportingProject } from '../components/SupportingProject';
import { creations } from '../data/creations';
import { studioLinks } from '../data/studioLinks';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Hero />
      <FeaturedProject />
      <section className="creations-section" id="creations" aria-labelledby="creations-title">
        <div className="creations-heading">
          <h2 id="creations-title">{t('creations.eyebrow')}</h2>
          <div className="project-actions creations-actions" aria-label={t('creations.linksLabel')}>
            <a className="action-link" href={studioLinks.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
            <a
              className="action-link action-link-primary"
              href={studioLinks.buyMeCoffee}
              rel="noreferrer"
              target="_blank"
            >
              {t('creations.buyMeCoffee')}
            </a>
          </div>
        </div>
        {creations.map((project, index) => (
          <SupportingProject project={project} index={index} key={project.id} />
        ))}
      </section>
    </>
  );
};
