export interface Region {
  id: string;
  name: string;
  code: string;
  projectCount: number;
  coordinates: [number, number];
  bounds: [[number, number], [number, number]];
  businessEntities: BusinessEntity[];
}

export interface BusinessEntity {
  id: string;
  name: string;
  coordinates: [number, number];
  projectCount: number;
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  status: 'Pre Projects' | 'Initiating' | 'Planning' | 'Executing' | 'Closing' | 'Closed';
  completion: number;
  afe: number;
  coordinates: [number, number];
  description: string;
  projectManager: string;
  gppmdSection: string;
  projectClass: string;
  afeCode: string;
  committed: number;
  actual: number;
  spent: number;
  totalAfeAmount: number;
  images: string[];
  satelliteImages: string[];
  videos: string[];
  lastUpdate: string;
}

export interface ProjectStats {
  preProjects: number;
  initiating: number;
  planning: number;
  executing: number;
  closing: number;
  closed: number;
  total: number;
}

export interface PortfolioData {
  portfolioProjects: number;
  portfolioValue: number;
  spentVsCommitted: {
    percentage: number;
    afeAmount: number;
    spentAmount: number;
    remainingAmount: number;
  };
  afeByProject: Array<{
    name: string;
    value: number;
  }>;
  scheduleStatus: {
    onTrack: number;
    recovered: number;
    delayed: number;
  };
}

// Sample data
export const regions: Region[] = [
  {
    id: 'amr',
    name: 'Americas',
    code: 'AMR',
    projectCount: 21,
    coordinates: [-95.7129, 37.0902],
    bounds: [[-168.0, -55.0], [-34.0, 71.0]],
    businessEntities: [
      {
        id: 'callao',
        name: 'Callao',
        coordinates: [-77.1181, -12.0464],
        projectCount: 4,
        projects: [
          {
            id: 'sndkr-ndayane',
            name: 'SNDKR Ndayane Port',
            status: 'Pre Projects',
            completion: 90,
            afe: 760650238,
            coordinates: [-77.1181, -12.0464],
            description: 'While weighbridge clerk (IP) was returning to weighbridge office (elevated platform). Well, the answer is actually no - rather than generating fancy fonts, this converter creates fancy symbols.',
            projectManager: 'Ian Wilcock',
            gppmdSection: 'Marine & Infrastructure',
            projectClass: 'Class 1 : Major Project',
            afeCode: 'ABC - 1234 - SDKSK',
            committed: 829411882,
            actual: 760650238,
            spent: 760650238,
            totalAfeAmount: 105505802,
            images: [
              'https://example.com/construction1.jpg',
              'https://example.com/construction2.jpg',
              'https://example.com/construction3.jpg',
              'https://example.com/construction4.jpg'
            ],
            satelliteImages: [
              'https://example.com/satellite1.jpg'
            ],
            videos: [
              'https://example.com/project-video.mp4'
            ],
            lastUpdate: '20.5.2025'
          },
          {
            id: 'ausyd-expansion',
            name: 'AUSYD Expansion 2022',
            status: 'Planning',
            completion: 25,
            afe: 50650678,
            coordinates: [-77.1281, -12.0564],
            description: 'Expansion project for AUSYD terminal facilities.',
            projectManager: 'Sarah Johnson',
            gppmdSection: 'Terminal Operations',
            projectClass: 'Class 2 : Standard Project',
            afeCode: 'DEF - 5678 - AUSYD',
            committed: 60000000,
            actual: 50650678,
            spent: 12000000,
            totalAfeAmount: 60000000,
            images: [],
            satelliteImages: [],
            videos: [],
            lastUpdate: '15.4.2025'
          }
        ]
      },
      {
        id: 'santos',
        name: 'Santos',
        coordinates: [-46.3333, -23.9608],
        projectCount: 6,
        projects: []
      },
      {
        id: 'duke',
        name: 'Duke',
        coordinates: [-78.9382, 36.0014],
        projectCount: 11,
        projects: []
      }
    ]
  },
  {
    id: 'eur',
    name: 'Europe',
    code: 'EUR',
    projectCount: 11,
    coordinates: [10.4515, 51.1657],
    bounds: [[-25.0, 34.0], [45.0, 72.0]],
    businessEntities: []
  },
  {
    id: 'sco',
    name: 'Subcontinent',
    code: 'SCO',
    projectCount: 6,
    coordinates: [78.9629, 20.5937],
    bounds: [[60.0, 5.0], [100.0, 40.0]],
    businessEntities: []
  }
];

export const globalProjectStats: ProjectStats = {
  preProjects: 39,
  initiating: 20,
  planning: 22,
  executing: 41,
  closing: 3,
  closed: 0,
  total: 125
};

export const globalPortfolioData: PortfolioData = {
  portfolioProjects: 75,
  portfolioValue: 5489.5, // in millions
  spentVsCommitted: {
    percentage: 45,
    afeAmount: 1432, // in millions
    spentAmount: 31768, // in millions
    remainingAmount: 3768 // in millions
  },
  afeByProject: [
    { name: 'Project 1', value: 5829 },
    { name: 'Project 2', value: 1046 },
    { name: 'Project 3', value: 374 },
    { name: 'Project 4', value: 443 },
    { name: 'Project 5', value: 309 },
    { name: 'Project 6', value: 3807 },
    { name: 'Project 7', value: 359 },
    { name: 'Project 8', value: 600 }
  ],
  scheduleStatus: {
    onTrack: 75,
    recovered: 10,
    delayed: 15
  }
};

export const projectsByHoPm = [
  { name: 'Project 1', value: 1.84, color: '#4F46E5' },
  { name: 'Project 2', value: 1046, color: '#4F46E5' },
  { name: 'Project 3', value: 374, color: '#4F46E5' },
  { name: 'Project 4', value: 443, color: '#4F46E5' },
  { name: 'Project 5', value: 309, color: '#4F46E5' }
];

export const hopmDistribution = [
  { label: 'HO PM 1', value: 14, color: '#10B981' },
  { label: 'HO PM 2', value: 9, color: '#F59E0B' },
  { label: 'HO PM 3', value: 12, color: '#EF4444' },
  { label: 'HO PM 4', value: 5, color: '#8B5CF6' }
];
