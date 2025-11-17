import axios from 'axios';
import { Track, Playlist, Album } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Track API
export const trackAPI = {
  getAll: async (): Promise<Track[]> => {
    const { data } = await api.get('/tracks');
    return data.data;
  },

  getById: async (id: string): Promise<Track> => {
    const { data } = await api.get(`/tracks/${id}`);
    return data.data;
  },

  search: async (query: string): Promise<Track[]> => {
    const { data } = await api.get(`/tracks/search?q=${encodeURIComponent(query)}`);
    return data.data;
  },

  create: async (track: Partial<Track>): Promise<Track> => {
    const { data } = await api.post('/tracks', track);
    return data.data;
  },

  update: async (id: string, track: Partial<Track>): Promise<Track> => {
    const { data } = await api.put(`/tracks/${id}`, track);
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tracks/${id}`);
  },
};

// Playlist API
export const playlistAPI = {
  getUserPlaylists: async (userId: string): Promise<Playlist[]> => {
    const { data } = await api.get(`/playlists/user/${userId}`);
    return data.data;
  },

  getById: async (id: string): Promise<Playlist> => {
    const { data } = await api.get(`/playlists/${id}`);
    return data.data;
  },

  create: async (playlist: Partial<Playlist>): Promise<Playlist> => {
    const { data } = await api.post('/playlists', playlist);
    return data.data;
  },

  update: async (id: string, playlist: Partial<Playlist>): Promise<Playlist> => {
    const { data } = await api.put(`/playlists/${id}`, playlist);
    return data.data;
  },

  addTrack: async (playlistId: string, trackId: string): Promise<Playlist> => {
    const { data } = await api.post(`/playlists/${playlistId}/tracks`, { trackId });
    return data.data;
  },

  removeTrack: async (playlistId: string, trackId: string): Promise<Playlist> => {
    const { data } = await api.delete(`/playlists/${playlistId}/tracks/${trackId}`);
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/playlists/${id}`);
  },
};

export default api;
