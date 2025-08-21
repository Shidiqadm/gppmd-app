import { create } from 'zustand';
import type { RegionCode } from '@app/data/sample';

interface GeoState {
  selectedRegion: RegionCode | null;
  selectedEntityId: string | null;
  selectedProjectId: string | null;
  setRegion: (code: GeoState['selectedRegion']) => void;
  setEntity: (id: GeoState['selectedEntityId']) => void;
  setProject: (id: GeoState['selectedProjectId']) => void;
}

export const useGeoStore = create<GeoState>((set) => ({
  selectedRegion: null,
  selectedEntityId: null,
  selectedProjectId: null,
  setRegion: (code) => set({ selectedRegion: code, selectedEntityId: null, selectedProjectId: null }),
  setEntity: (id) => set({ selectedEntityId: id, selectedProjectId: null }),
  setProject: (id) => set({ selectedProjectId: id }),
}));
