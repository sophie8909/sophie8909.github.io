export type ProjectId = 'artcodex' | 'sxstx' | 'catrodis';
export type ProjectActionId =
  | 'github'
  | 'artcodex'
  | 'openTool'
  | 'comingSoon';

export interface ProjectAction {
  id: ProjectActionId;
  href?: string;
}

export interface Project {
  id: ProjectId;
  shape: 'circle' | 'square' | 'diamond' | 'triangle';
  anchor: string;
  actions: ProjectAction[];
}

export const studioLinks = {
  github: 'https://github.com/sophie8909',
  buyMeCoffee: 'https://www.buymeacoffee.com/feiyastudio'
};

export const artcodexUrl = 'https://feiyastudio.com/artcodex';

export const featuredProject: Project = {
  id: 'catrodis',
  shape: 'diamond',
  anchor: 'catrodis',
  actions: [
    {
      id: 'comingSoon'
    }
  ]
};

export const supportingProjects: Project[] = [
  {
    id: 'artcodex',
    shape: 'circle',
    anchor: 'artcodex',
    actions: [
      {
        id: 'artcodex',
        href: artcodexUrl
      }
    ]
  },
  {
    id: 'sxstx',
    shape: 'square',
    anchor: 'sxstx-calculator',
    actions: [
      {
        id: 'openTool',
        href: 'https://sophie8909.github.io/sxstx_calculator/'
      },
      {
        id: 'github',
        href: 'https://github.com/sophie8909/sxstx_calculator'
      }
    ]
  }
];
