import { Request, Response } from 'express';
import Playlist from '../models/Playlist';

// Get all playlists for a user
export const getUserPlaylists = async (req: Request, res: Response) => {
  try {
    const playlists = await Playlist.find({ userId: req.params.userId })
      .populate('tracks')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: playlists });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Get playlist by ID
export const getPlaylistById = async (req: Request, res: Response) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('tracks');

    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }

    res.json({ success: true, data: playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Create new playlist
export const createPlaylist = async (req: Request, res: Response) => {
  try {
    const playlist = new Playlist(req.body);
    await playlist.save();

    res.status(201).json({ success: true, data: playlist });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data', error });
  }
};

// Update playlist
export const updatePlaylist = async (req: Request, res: Response) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('tracks');

    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }

    res.json({ success: true, data: playlist });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data', error });
  }
};

// Add track to playlist
export const addTrackToPlaylist = async (req: Request, res: Response) => {
  try {
    const { trackId } = req.body;
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }

    if (!playlist.tracks.includes(trackId)) {
      playlist.tracks.push(trackId);
      await playlist.save();
    }

    await playlist.populate('tracks');

    res.json({ success: true, data: playlist });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data', error });
  }
};

// Remove track from playlist
export const removeTrackFromPlaylist = async (req: Request, res: Response) => {
  try {
    const { trackId } = req.params;
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }

    playlist.tracks = playlist.tracks.filter(
      (id) => id.toString() !== trackId
    );
    await playlist.save();
    await playlist.populate('tracks');

    res.json({ success: true, data: playlist });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data', error });
  }
};

// Delete playlist
export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);

    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }

    res.json({ success: true, message: 'Playlist deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
