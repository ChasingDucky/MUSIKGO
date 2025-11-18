import { Box, Container, Typography, Tabs, Tab, Grid } from '@mui/material';
import { useState } from 'react';
import { TrackList } from '@/components/TrackList/TrackList';
import { AlbumCard } from '@/components/AlbumCard/AlbumCard';
import { AlbumCardMaterial } from '@/components/AlbumCard/AlbumCardMaterial';
import { useUIStore } from '@/stores/uiStore';
import { Track, Album } from '@/types';

// Mock data
const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Get Lucky',
    artist: 'Daft Punk',
    album: 'Random Access Memories',
    duration: 367,
    coverUrl: 'https://picsum.photos/400/400?random=1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Come Together',
    artist: 'The Beatles',
    album: 'Abbey Road',
    duration: 259,
    coverUrl: 'https://picsum.photos/400/400?random=2',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Time',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: 413,
    coverUrl: 'https://picsum.photos/400/400?random=3',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Random Access Memories',
    artist: 'Daft Punk',
    coverUrl: 'https://picsum.photos/400/400?random=1',
    year: 2013,
    tracks: [],
  },
  {
    id: '2',
    title: 'Abbey Road',
    artist: 'The Beatles',
    coverUrl: 'https://picsum.photos/400/400?random=2',
    year: 1969,
    tracks: [],
  },
];

export function Library() {
  const [tabValue, setTabValue] = useState(0);
  const { style } = useUIStore();

  const AlbumCardComponent = style === 'liquid-glass' ? AlbumCard : AlbumCardMaterial;

  return (
    <Box sx={{ pb: 12 }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Your Library
        </Typography>

        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Tracks" />
          <Tab label="Albums" />
          <Tab label="Playlists" />
        </Tabs>

        {tabValue === 0 && <TrackList tracks={mockTracks} />}

        {tabValue === 1 && (
          <Grid container spacing={3}>
            {mockAlbums.map((album) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
                <AlbumCardComponent album={album} />
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 2 && (
          <Typography variant="body1" color="text.secondary">
            No playlists yet. Create your first playlist to get started!
          </Typography>
        )}
      </Container>
    </Box>
  );
}
