import mongoose, { Schema, Document } from 'mongoose';

export interface ITrack extends Document {
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  genre?: string;
  year?: number;
  createdAt: Date;
  updatedAt: Date;
}

const TrackSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    album: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    coverUrl: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for search
TrackSchema.index({ title: 'text', artist: 'text', album: 'text' });

export default mongoose.model<ITrack>('Track', TrackSchema);
