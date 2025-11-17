import { create } from 'zustand';
import { Track } from '@/types';

interface PlayerState {
  // Current playback
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;

  // Queue management
  queue: Track[];
  currentIndex: number;

  // Playback modes
  repeatMode: 'off' | 'one' | 'all';
  shuffleMode: boolean;

  // Audio element
  audioElement: HTMLAudioElement | null;

  // Actions
  setCurrentTrack: (track: Track) => void;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  next: () => void;
  previous: () => void;
  setQueue: (tracks: Track[], startIndex?: number) => void;
  addToQueue: (track: Track) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setAudioElement: (element: HTMLAudioElement) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  queue: [],
  currentIndex: -1,
  repeatMode: 'off',
  shuffleMode: false,
  audioElement: null,

  setCurrentTrack: (track) => {
    const { audioElement } = get();
    set({ currentTrack: track, currentTime: 0 });
    if (audioElement) {
      audioElement.src = track.audioUrl;
      audioElement.load();
    }
  },

  play: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.play();
      set({ isPlaying: true });
    }
  },

  pause: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.pause();
      set({ isPlaying: false });
    }
  },

  togglePlayPause: () => {
    const { isPlaying, play, pause } = get();
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  },

  setVolume: (volume) => {
    const { audioElement } = get();
    set({ volume });
    if (audioElement) {
      audioElement.volume = volume;
    }
  },

  seek: (time) => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.currentTime = time;
      set({ currentTime: time });
    }
  },

  next: () => {
    const { queue, currentIndex, repeatMode, setCurrentTrack, play } = get();

    if (queue.length === 0) return;

    let nextIndex = currentIndex + 1;

    if (nextIndex >= queue.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        return;
      }
    }

    set({ currentIndex: nextIndex });
    setCurrentTrack(queue[nextIndex]);
    play();
  },

  previous: () => {
    const { queue, currentIndex, currentTime, setCurrentTrack, seek, play } = get();

    // If more than 3 seconds into the song, restart it
    if (currentTime > 3) {
      seek(0);
      return;
    }

    if (queue.length === 0) return;

    let prevIndex = currentIndex - 1;

    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }

    set({ currentIndex: prevIndex });
    setCurrentTrack(queue[prevIndex]);
    play();
  },

  setQueue: (tracks, startIndex = 0) => {
    set({ queue: tracks, currentIndex: startIndex });
    if (tracks.length > 0 && startIndex >= 0 && startIndex < tracks.length) {
      get().setCurrentTrack(tracks[startIndex]);
    }
  },

  addToQueue: (track) => {
    const { queue } = get();
    set({ queue: [...queue, track] });
  },

  toggleRepeat: () => {
    const { repeatMode } = get();
    const modes: Array<'off' | 'one' | 'all'> = ['off', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    set({ repeatMode: nextMode });
  },

  toggleShuffle: () => {
    const { shuffleMode, queue, currentTrack } = get();

    if (!shuffleMode && queue.length > 0) {
      // Shuffle the queue
      const shuffled = [...queue];
      const currentIndex = shuffled.findIndex(t => t.id === currentTrack?.id);

      // Remove current track
      if (currentIndex !== -1) {
        shuffled.splice(currentIndex, 1);
      }

      // Shuffle remaining tracks
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Put current track at the beginning
      if (currentTrack && currentIndex !== -1) {
        shuffled.unshift(currentTrack);
      }

      set({ queue: shuffled, shuffleMode: true, currentIndex: 0 });
    } else {
      set({ shuffleMode: false });
    }
  },

  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setAudioElement: (element) => set({ audioElement: element }),
}));
