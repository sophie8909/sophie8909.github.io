import { useTranslation } from 'react-i18next';
import { BlueprintMap } from './BlueprintMap';

export const FeaturedProject = () => {
  const { t } = useTranslation();
  const projectId = 'catrodis';

  return (
    <section className="featured-project" id="catrodis" aria-labelledby="featured-project-title">
      <div className="featured-layout">
        <div className="featured-copy">
          <h2 id="featured-project-title">{t(`projects.${projectId}.title`)}</h2>
          <p className="featured-subtitle">{t(`projects.${projectId}.subtitle`)}</p>
          <p className="project-description">{t(`projects.${projectId}.description`)}</p>
          <div className="project-actions">
            <button
              className="action-link action-link-primary"
              type="button"
              disabled
              aria-label={t('projects.actions.comingSoon.aria', {
                project: t(`projects.${projectId}.title`)
              })}
            >
              {t('projects.actions.comingSoon.label')}
            </button>
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
