import { FeaturedProject } from '../components/FeaturedProject';
import { Hero } from '../components/Hero';
import { SupportingProject } from '../components/SupportingProject';
import { supportingProjects } from '../data/projects';

export const HomePage = () => (
  <>
    <Hero />
    <FeaturedProject />
    {supportingProjects.map((project, index) => (
      <SupportingProject project={project} index={index} key={project.id} />
    ))}
  </>
);
