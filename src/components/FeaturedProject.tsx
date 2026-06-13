import { useTranslation } from 'react-i18next';
import { featuredProject } from '../data/projects';
import { BlueprintMap } from './BlueprintMap';

export const FeaturedProject = () => {
  const { t } = useTranslation();
  const project = featuredProject;

  return (
    <section className="featured-project" id={project.anchor} aria-labelledby="featured-project-title">
      <div className="section-kicker">
        <p className="section-number">01</p>
        <p className="eyebrow">{t('featured.eyebrow')}</p>
      </div>

      <div className="featured-layout">
        <div className="featured-copy">
          <p className="featured-label">{t('featured.label')}</p>
          <h2 id="featured-project-title">{t(`projects.${project.id}.title`)}</h2>
          <p className="featured-subtitle">{t(`projects.${project.id}.subtitle`)}</p>
          <p className="project-description">{t(`projects.${project.id}.description`)}</p>
          <div className="project-actions">
            {project.actions.map((action) => {
              const className = action.id === project.actions[0].id ? 'action-link action-link-primary' : 'action-link';
              const ariaLabel = t(`projects.actions.${action.id}.aria`, {
                project: t(`projects.${project.id}.title`)
              });

              if (!action.href) {
                return (
                  <button className={className} key={action.id} type="button" disabled aria-label={ariaLabel}>
                    {t(`projects.actions.${action.id}.label`)}
                  </button>
                );
              }

              return (
                <a
                  className={className}
                  href={action.href}
                  key={action.id}
                  rel="noreferrer"
                  target="_blank"
                  aria-label={ariaLabel}
                >
                  {t(`projects.actions.${action.id}.label`)}
                </a>
              );
            })}
          </div>
        </div>

        <div className="featured-blueprint">
          <BlueprintMap />
          <span className="featured-axis featured-axis-horizontal" aria-hidden="true" />
          <span className="featured-axis featured-axis-vertical" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
