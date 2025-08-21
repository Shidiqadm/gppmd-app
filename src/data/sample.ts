// Sample hierarchical data for regions -> entities -> projects
// Coordinates are [longitude, latitude]

export type RegionCode = 'AMR' | 'SCO' | 'EUR' | 'AFR' | 'MEA' | 'APAC';

export interface Region {
  code: RegionCode;
  name: string;
  center: [number, number];
  activeProjects: number;
}

export interface BusinessEntity {
  id: string;
  name: string;
  region: RegionCode;
  location: [number, number];
  activeProjects: number;
}

export type ProjectPhase =
  | 'Pre Projects'
  | 'Initiating'
  | 'Planning'
  | 'Executing'
  | 'Closing'
  | 'Closed';

export interface ProjectItem {
  id: string;
  entityId: string;
  title: string;
  phase: ProjectPhase;
  completionPct: number; // 0-100
  afeAmount: number; // USD in millions
  location: [number, number];
  images: string[]; // remote urls
  video?: string; // remote url
}

export const regions: Region[] = [
  { code: 'AMR', name: 'Americas', center: [-75, 15], activeProjects: 21 },
  { code: 'SCO', name: 'South & Central', center: [80, 20], activeProjects: 6 },
  { code: 'EUR', name: 'Europe', center: [10, 50], activeProjects: 11 },
  { code: 'AFR', name: 'Africa', center: [20, 5], activeProjects: 14 },
  { code: 'MEA', name: 'Middle East', center: [45, 25], activeProjects: 11 },
  { code: 'APAC', name: 'Asia Pacific', center: [120, -5], activeProjects: 14 },
];

export const entities: BusinessEntity[] = [
  { id: 'callao', name: 'CALLAO', region: 'AMR', location: [-77.1, -12.05], activeProjects: 4 },
  { id: 'santos', name: 'SANTOS', region: 'AMR', location: [-46.33, -23.95], activeProjects: 6 },
  { id: 'duke', name: 'DUKE', region: 'AMR', location: [-78.3, -0.18], activeProjects: 11 },
];

export const projects: ProjectItem[] = [
  {
    id: 'sndkr',
    entityId: 'callao',
    title: 'SNDKR Ndayane Port',
    phase: 'Pre Projects',
    completionPct: 90,
    afeAmount: 1432,
    location: [-77.11, -12.06],
    images: [
      'https://images.unsplash.com/photo-1581092336769-7b1a8f3dba9b?q=80&w=1024&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541976076758-347942db197d?q=80&w=1024&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1024&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1024&auto=format&fit=crop',
    ],
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 'ausyd',
    entityId: 'santos',
    title: 'AUSYD Expansion 2022',
    phase: 'Planning',
    completionPct: 25,
    afeAmount: 50.65,
    location: [-46.32, -23.92],
    images: [
      'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1024&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1024&auto=format&fit=crop',
    ],
  },
];

export const projectPhaseSummary = {
  total: 125,
  counts: {
    'Pre Projects': 39,
    Initiating: 20,
    Planning: 22,
    Executing: 41,
    Closing: 3,
    Closed: 0,
  } as Record<ProjectPhase, number>,
};

export const portfolioSummary = {
  projects: 75,
  valueAFE: 5489.5,
  spent: 31768,
  remaining: 3768,
  spentPct: 45,
};
