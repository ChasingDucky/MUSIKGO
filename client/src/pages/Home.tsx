import { Box, Container, Typography, Grid, Stack } from '@mui/material';
import { AlbumCard } from '@/components/AlbumCard/AlbumCard';
import { Album } from '@/types';

// Mock data - will be replaced with API calls
const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Random Access Memories',
    artist: 'Daft Punk',
    coverUrl: 'https://picsum.photos/400/400?random=1',
    year: 2013,
    genre: 'Electronic',
    tracks: [],
  },
  {
    id: '2',
    title: 'Abbey Road',
    artist: 'The Beatles',
    coverUrl: 'https://picsum.photos/400/400?random=2',
    year: 1969,
    genre: 'Rock',
    tracks: [],
  },
  {
    id: '3',
    title: 'The Dark Side of the Moon',
    artist: 'Pink Floyd',
    coverUrl: 'https://picsum.photos/400/400?random=3',
    year: 1973,
    genre: 'Progressive Rock',
    tracks: [],
  },
  {
    id: '4',
    title: 'Thriller',
    artist: 'Michael Jackson',
    coverUrl: 'https://picsum.photos/400/400?random=4',
    year: 1982,
    genre: 'Pop',
    tracks: [],
  },
  {
    id: '5',
    title: 'Back in Black',
    artist: 'AC/DC',
    coverUrl: 'https://picsum.photos/400/400?random=5',
    year: 1980,
    genre: 'Hard Rock',
    tracks: [],
  },
  {
    id: '6',
    title: 'The Wall',
    artist: 'Pink Floyd',
    coverUrl: 'https://picsum.photos/400/400?random=6',
    year: 1979,
    genre: 'Progressive Rock',
    tracks: [],
  },
];

export function Home() {
  return (
    <Box sx={{ pb: 12 }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Featured Section */}
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Featured Albums
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Discover the best music from around the world
            </Typography>
          </Box>

          {/* Albums Grid */}
          <Grid container spacing={3}>
            {mockAlbums.map((album) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={album.id}>
                <AlbumCard album={album} />
              </Grid>
            ))}
          </Grid>

          {/* Recently Played */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Recently Played
            </Typography>
            <Grid container spacing={3}>
              {mockAlbums.slice(0, 4).map((album) => (
                <Grid item xs={12} sm={6} md={3} key={album.id}>
                  <AlbumCard album={album} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Made For You */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Made For You
            </Typography>
            <Grid container spacing={3}>
              {mockAlbums.slice(2).map((album) => (
                <Grid item xs={12} sm={6} md={3} key={album.id}>
                  <AlbumCard album={album} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
