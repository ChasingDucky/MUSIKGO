import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  mode: 'light' | 'dark';
  monetPalette: any | null;
  toggleMode: () => void;
  setMode: (mode: 'light' | 'dark') => void;
  setMonetPalette: (palette: any) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'dark',
      monetPalette: null,

      toggleMode: () =>
        set((state) => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
        })),

      setMode: (mode) => set({ mode }),

      setMonetPalette: (palette) => set({ monetPalette: palette }),
    }),
    {
      name: 'musikgo-theme',
    }
  )
);
