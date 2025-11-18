import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Track } from '@/types';

interface LikedSongsState {
  likedSongs: Set<string>; // Track IDs
  likedTracks: Track[]; // Full track objects
  toggleLike: (track: Track) => void;
  isLiked: (trackId: string) => boolean;
  getLikedTracks: () => Track[];
  clearAll: () => void;
}

export const useLikedSongsStore = create<LikedSongsState>()(
  persist(
    (set, get) => ({
      likedSongs: new Set<string>(),
      likedTracks: [],

      toggleLike: (track) => {
        const { likedSongs, likedTracks } = get();
        const newLikedSongs = new Set(likedSongs);
        let newLikedTracks = [...likedTracks];

        if (newLikedSongs.has(track.id)) {
          // Unlike
          newLikedSongs.delete(track.id);
          newLikedTracks = newLikedTracks.filter((t) => t.id !== track.id);
        } else {
          // Like
          newLikedSongs.add(track.id);
          newLikedTracks.push(track);
        }

        set({
          likedSongs: newLikedSongs,
          likedTracks: newLikedTracks,
        });
      },

      isLiked: (trackId) => {
        return get().likedSongs.has(trackId);
      },

      getLikedTracks: () => {
        return get().likedTracks;
      },

      clearAll: () => {
        set({
          likedSongs: new Set<string>(),
          likedTracks: [],
        });
      },
    }),
    {
      name: 'musikgo-liked-songs',
      // Custom serializer for Set
      partialize: (state) => ({
        likedSongs: Array.from(state.likedSongs),
        likedTracks: state.likedTracks,
      }),
      // Custom deserializer for Set
      merge: (persistedState, currentState) => {
        const persisted = persistedState as any;
        return {
          ...currentState,
          likedSongs: new Set(persisted.likedSongs || []),
          likedTracks: persisted.likedTracks || [],
        };
      },
    }
  )
);
