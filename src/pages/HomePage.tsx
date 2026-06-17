import { FeaturedProject } from '../components/FeaturedProject';
import { Hero } from '../components/Hero';
import { SupportingProject } from '../components/SupportingProject';
import { supportingProjects } from '../data/projects';

export const HomePage = () => (
  <>
    <Hero />
    <section className="seo-overview" aria-labelledby="studio-overview-title">
      <div className="section-heading">
        <p className="eyebrow">Studio overview</p>
        <h2 id="studio-overview-title">Independent worlds and practical creative tools</h2>
      </div>
      <div className="seo-copy seo-copy-columns">
        <p>
          Feiya Studio is an independent creative studio building original worlds, focused creator utilities,
          and small tools that solve real production or planning problems. The studio site collects those works
          in one place so players, artists, and collaborators can discover the active projects without needing
          to search through separate repositories or product pages.
        </p>
        <p>
          CatRodis is the studio's original world project: a post-human setting rebuilt around cats, relics,
          factions, and character-driven stories. It anchors the studio's narrative direction and gives future
          games, prototypes, and visual experiments a shared setting to grow from.
        </p>
        <p>
          ArtCodex is a creator workflow tool for image-generation projects. It helps organize project context,
          categories, style records, reusable visual rules, and prompt drafts so creators can move from scattered
          notes to structured image prompts with less repetition.
        </p>
        <p>
          The calculator tools focus on game progression planning. The current calculator entry supports Wand &
          Sword material planning, including character growth, skill material needs, and equipment development.
          Together, CatRodis, ArtCodex, and the calculator tools show the Feiya Studio approach: build imaginative
          worlds, then support them with practical systems that make creative and player workflows easier to use.
        </p>
      </div>
    </section>
    <FeaturedProject />
    {supportingProjects.map((project, index) => (
      <SupportingProject project={project} index={index} key={project.id} />
    ))}
  </>
);
