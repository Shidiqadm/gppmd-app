import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the app state interface
interface AppState {
  // User state
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
    isAuthenticated: boolean;
  };
  
  // App settings
  settings: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    notifications: boolean;
  };
  
  // Loading states
  loading: {
    auth: boolean;
    data: boolean;
  };
}

// Define actions interface
interface AppActions {
  // User actions
  setUser: (user: Partial<AppState['user']>) => void;
  logout: () => void;
  
  // Settings actions
  updateSettings: (settings: Partial<AppState['settings']>) => void;
  
  // Loading actions
  setLoading: (key: keyof AppState['loading'], value: boolean) => void;
  
  // Reset store
  reset: () => void;
}

// Initial state
const initialState: AppState = {
  user: {
    id: null,
    name: null,
    email: null,
    isAuthenticated: false,
  },
  settings: {
    theme: 'system',
    language: 'en',
    notifications: true,
  },
  loading: {
    auth: false,
    data: false,
  },
};

// Create the store
export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // User actions
      setUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),
      
      logout: () =>
        set((state) => ({
          user: {
            id: null,
            name: null,
            email: null,
            isAuthenticated: false,
          },
        })),
      
      // Settings actions
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      
      // Loading actions
      setLoading: (key, value) =>
        set((state) => ({
          loading: { ...state.loading, [key]: value },
        })),
      
      // Reset store
      reset: () => set(initialState),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        settings: state.settings,
      }),
    }
  )
);

// Selector hooks for better performance
export const useUser = () => useAppStore((state) => state.user);
export const useSettings = () => useAppStore((state) => state.settings);
export const useLoading = () => useAppStore((state) => state.loading);
