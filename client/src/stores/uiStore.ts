import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UIStyle = 'liquid-glass' | 'material';

interface UIState {
  style: UIStyle;
  setStyle: (style: UIStyle) => void;
  toggleStyle: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      style: 'liquid-glass',

      setStyle: (style) => set({ style }),

      toggleStyle: () =>
        set((state) => ({
          style: state.style === 'liquid-glass' ? 'material' : 'liquid-glass',
        })),
    }),
    {
      name: 'musikgo-ui-style',
    }
  )
);
