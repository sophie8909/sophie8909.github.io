import { useTranslation } from 'react-i18next';
import type { Creation } from '../data/creations';
import type { LanguageCode } from '../i18n/config';

interface SupportingProjectProps {
  project: Creation;
  index: number;
}

const visualShapes = ['circle', 'square', 'diamond', 'triangle'] as const;
const getLocalizedText = (text: Creation['title'], language: string) =>
  text[language as LanguageCode] ?? text.en;

export const SupportingProject = ({ project, index }: SupportingProjectProps) => {
  const { i18n, t } = useTranslation();
  const sequence = String(index + 1).padStart(2, '0');
  const layoutClassName = index % 2 === 1 ? ' supporting-project-reverse' : '';
  const visualShape = visualShapes[index % visualShapes.length];
  const title = getLocalizedText(project.title, i18n.language);
  const subtitle = getLocalizedText(project.subtitle, i18n.language);
  const description = getLocalizedText(project.description, i18n.language);

  return (
    <section
      className={`supporting-project supporting-project-${project.id}${layoutClassName}`}
      id={project.id}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="tool-copy">
        <span className="tool-index">{sequence}</span>
        <h2 id={`${project.id}-title`}>{title}</h2>
        <p className="tool-subtitle">{subtitle}</p>
        <p>{description}</p>
        <div className="project-actions">
          {project.buttons.map((button, buttonIndex) => {
            const hasLink = button.clickable && Boolean(button.href);
            const isExternal = Boolean(button.href && /^https?:\/\//.test(button.href));
            const buttonLabel = getLocalizedText(button.label, i18n.language);
            const className = buttonIndex === 0 ? 'action-link action-link-primary' : 'action-link';

            if (hasLink && button.href) {
              return (
                <a
                  className={className}
                  href={button.href}
                  key={buttonLabel}
                  rel={isExternal ? 'noreferrer' : undefined}
                  target={isExternal ? '_blank' : undefined}
                  aria-label={t('creations.openAria', { title })}
                >
                  {buttonLabel}
                </a>
              );
            }

            return (
              <button
                className={className}
                key={buttonLabel}
                type="button"
                disabled
                aria-label={t('creations.comingSoonAria', { title })}
              >
                {buttonLabel}
              </button>
            );
          })}
        </div>
      </div>
      <div className="tool-visual" aria-hidden="true">
        <span className={`visual-shape visual-shape-${visualShape}`} />
        <span className="visual-axis visual-axis-horizontal" />
        <span className="visual-axis visual-axis-vertical" />
      </div>
    </section>
  );
};
