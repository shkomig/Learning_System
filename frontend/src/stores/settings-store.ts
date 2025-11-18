import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number;
  language: 'he' | 'en';
  difficulty: 'auto' | 'easy' | 'medium' | 'hard';
  
  // Actions
  toggleSound: () => void;
  toggleMusic: () => void;
  setVolume: (volume: number) => void;
  setLanguage: (language: 'he' | 'en') => void;
  setDifficulty: (difficulty: 'auto' | 'easy' | 'medium' | 'hard') => void;
  reset: () => void;
}

const initialState = {
  soundEnabled: true,
  musicEnabled: false,
  volume: 0.5,
  language: 'he' as const,
  difficulty: 'auto' as const,
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      
      toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
      
      setVolume: (volume) => set({ volume }),
      
      setLanguage: (language) => set({ language }),
      
      setDifficulty: (difficulty) => set({ difficulty }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'app-settings',
    }
  )
);


