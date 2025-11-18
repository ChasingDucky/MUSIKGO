import { Request, Response } from 'express';
import Track from '../models/Track';

// Get all tracks
export const getAllTracks = async (_req: Request, res: Response) => {
  try {
    const tracks = await Track.find().sort({ createdAt: -1 });
    res.json({ success: true, data: tracks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Get track by ID
export const getTrackById = async (req: Request, res: Response) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).json({ success: false, message: 'Track not found' });
    }

    res.json({ success: true, data: track });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Search tracks
export const searchTracks = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ success: false, message: 'Query parameter required' });
    }

    const tracks = await Track.find({
      $text: { $search: q as string },
    });

    res.json({ success: true, data: tracks });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Create new track
export const createTrack = async (req: Request, res: Response) => {
  try {
    const track = new Track(req.body);
    await track.save();

    res.status(201).json({ success: true, data: track });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data', error });
  }
};

// Update track
export const updateTrack = async (req: Request, res: Response) => {
  try {
    const track = await Track.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!track) {
      return res.status(404).json({ success: false, message: 'Track not found' });
    }

    res.json({ success: true, data: track });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Invalid data', error });
  }
};

// Delete track
export const deleteTrack = async (req: Request, res: Response) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);

    if (!track) {
      return res.status(404).json({ success: false, message: 'Track not found' });
    }

    res.json({ success: true, message: 'Track deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};
