import dotenv from 'dotenv';
import Track from '../models/Track';
import { connectDatabase } from '../config/database';

dotenv.config();

const sampleTracks = [
  {
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: 354,
    coverUrl: 'https://picsum.photos/400/400?random=101',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    genre: 'Rock',
    year: 1975,
  },
  {
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    duration: 482,
    coverUrl: 'https://picsum.photos/400/400?random=102',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Rock',
    year: 1971,
  },
  {
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    duration: 183,
    coverUrl: 'https://picsum.photos/400/400?random=103',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Pop',
    year: 1971,
  },
  {
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    duration: 294,
    coverUrl: 'https://picsum.photos/400/400?random=104',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    genre: 'Pop',
    year: 1982,
  },
  {
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    duration: 301,
    coverUrl: 'https://picsum.photos/400/400?random=105',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    genre: 'Grunge',
    year: 1991,
  },
  {
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    duration: 391,
    coverUrl: 'https://picsum.photos/400/400?random=106',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    genre: 'Rock',
    year: 1976,
  },
  {
    title: 'Sweet Child O Mine',
    artist: 'Guns N Roses',
    album: 'Appetite for Destruction',
    duration: 356,
    coverUrl: 'https://picsum.photos/400/400?random=107',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    genre: 'Rock',
    year: 1987,
  },
  {
    title: 'One',
    artist: 'Metallica',
    album: '...And Justice for All',
    duration: 445,
    coverUrl: 'https://picsum.photos/400/400?random=108',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    genre: 'Metal',
    year: 1988,
  },
];

async function seedDatabase() {
  try {
    await connectDatabase();

    // Clear existing tracks
    await Track.deleteMany({});
    console.log('Cleared existing tracks');

    // Insert sample tracks
    const tracks = await Track.insertMany(sampleTracks);
    console.log(`Inserted ${tracks.length} sample tracks`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
