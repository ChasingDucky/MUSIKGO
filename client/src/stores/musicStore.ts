import { create } from 'zustand';
import { Track, Album, Playlist } from '@/types';
import { trackAPI, playlistAPI } from '@/services/api';

interface MusicState {
  // Data
  tracks: Track[];
  albums: Album[];
  playlists: Playlist[];

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchTracks: () => Promise<void>;
  searchTracks: (query: string) => Promise<Track[]>;
  fetchPlaylists: (userId: string) => Promise<void>;
  createPlaylist: (name: string, description?: string) => Promise<Playlist>;
  addTrackToPlaylist: (playlistId: string, trackId: string) => Promise<void>;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  tracks: [],
  albums: [],
  playlists: [],
  isLoading: false,
  error: null,

  fetchTracks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tracks = await trackAPI.getAll();
      set({ tracks, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch tracks',
        isLoading: false
      });
    }
  },

  searchTracks: async (query: string) => {
    if (!query.trim()) return [];

    set({ isLoading: true, error: null });
    try {
      const tracks = await trackAPI.search(query);
      set({ isLoading: false });
      return tracks;
    } catch (error: any) {
      set({
        error: error.message || 'Failed to search tracks',
        isLoading: false
      });
      return [];
    }
  },

  fetchPlaylists: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const playlists = await playlistAPI.getUserPlaylists(userId);
      set({ playlists, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch playlists',
        isLoading: false
      });
    }
  },

  createPlaylist: async (name: string, description?: string) => {
    set({ isLoading: true, error: null });
    try {
      const userId = 'demo-user'; // TODO: Get from auth
      const playlist = await playlistAPI.create({
        name,
        description,
        userId,
        tracks: [],
      } as any);

      set((state) => ({
        playlists: [...state.playlists, playlist],
        isLoading: false,
      }));

      return playlist;
    } catch (error: any) {
      set({
        error: error.message || 'Failed to create playlist',
        isLoading: false
      });
      throw error;
    }
  },

  addTrackToPlaylist: async (playlistId: string, trackId: string) => {
    try {
      const updatedPlaylist = await playlistAPI.addTrack(playlistId, trackId);

      set((state) => ({
        playlists: state.playlists.map((p) =>
          p.id === playlistId ? updatedPlaylist : p
        ),
      }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to add track to playlist' });
      throw error;
    }
  },

  removeTrackFromPlaylist: async (playlistId: string, trackId: string) => {
    try {
      const updatedPlaylist = await playlistAPI.removeTrack(playlistId, trackId);

      set((state) => ({
        playlists: state.playlists.map((p) =>
          p.id === playlistId ? updatedPlaylist : p
        ),
      }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to remove track from playlist' });
      throw error;
    }
  },

  setError: (error: string | null) => set({ error }),
}));
