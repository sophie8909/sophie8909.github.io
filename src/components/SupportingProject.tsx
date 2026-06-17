import { useTranslation } from 'react-i18next';
import type { Project } from '../data/projects';

interface SupportingProjectProps {
  project: Project;
  index: number;
}

export const SupportingProject = ({ project, index }: SupportingProjectProps) => {
  const { t } = useTranslation();

  return (
    <section
      className={`supporting-project supporting-project-${project.id}`}
      id={project.anchor}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="tool-copy">
        <span className="tool-index">0{index + 3}</span>
        <h2 id={`${project.id}-title`}>{t(`projects.${project.id}.title`)}</h2>
        <p className="tool-subtitle">{t(`projects.${project.id}.subtitle`)}</p>
        <p>{t(`projects.${project.id}.description`)}</p>
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

            const isExternal = /^https?:\/\//.test(action.href);

            return (
              <a
                className={className}
                href={action.href}
                key={action.id}
                rel={isExternal ? 'noreferrer' : undefined}
                target={isExternal ? '_blank' : undefined}
                aria-label={ariaLabel}
              >
                {t(`projects.actions.${action.id}.label`)}
              </a>
            );
          })}
        </div>
      </div>
      <div className="tool-visual" aria-hidden="true">
        <span className={`visual-shape visual-shape-${project.shape}`} />
        <span className="visual-axis visual-axis-horizontal" />
        <span className="visual-axis visual-axis-vertical" />
      </div>
    </section>
  );
};
