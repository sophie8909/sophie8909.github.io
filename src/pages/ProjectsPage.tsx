import { useTranslation } from 'react-i18next';
import { FeaturedProject } from '../components/FeaturedProject';
import { SupportingProject } from '../components/SupportingProject';
import { supportingProjects } from '../data/projects';

export const ProjectsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="page-shell">
      <section className="page-intro" aria-labelledby="projects-page-title">
        <p className="eyebrow">{t('projectsPage.eyebrow')}</p>
        <h1 id="projects-page-title">{t('projectsPage.heading')}</h1>
      </section>
      <FeaturedProject />
      {supportingProjects.map((project, index) => (
        <SupportingProject project={project} index={index} key={project.id} />
      ))}
    </div>
  );
};
