import { useEffect } from 'react';
import { usePlayerStore } from '@/stores/playerStore';

/**
 * Custom hook for keyboard shortcuts
 *
 * Keyboard shortcuts:
 * - Space: Play/Pause
 * - ArrowRight: Next track
 * - ArrowLeft: Previous track
 * - ArrowUp: Increase volume
 * - ArrowDown: Decrease volume
 * - M: Toggle mute
 */
export function useKeyboardShortcuts() {
  const {
    togglePlayPause,
    next,
    previous,
    setVolume,
    toggleMute,
    volume,
  } = usePlayerStore();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;

        case 'ArrowRight':
          if (!e.shiftKey) {
            e.preventDefault();
            next();
          }
          break;

        case 'ArrowLeft':
          if (!e.shiftKey) {
            e.preventDefault();
            previous();
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.1));
          break;

        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.1));
          break;

        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [togglePlayPause, next, previous, setVolume, toggleMute, volume]);
}
