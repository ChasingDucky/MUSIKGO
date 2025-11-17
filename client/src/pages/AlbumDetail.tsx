import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Chip,
  Avatar,
} from '@mui/material';
import { PlayArrow, Favorite, FavoriteBorder, MoreVert } from '@mui/icons-material';
import { TrackList } from '@/components/TrackList/TrackList';
import { Album, Track } from '@/types';
import { applyMonetTheme } from '@/theme/monetColors';
import { useThemeStore } from '@/stores/themeStore';

// Mock data - would come from API
const mockAlbum: Album = {
  id: '1',
  title: 'Random Access Memories',
  artist: 'Daft Punk',
  coverUrl: 'https://picsum.photos/400/400?random=1',
  year: 2013,
  genre: 'Electronic',
  tracks: [
    {
      id: '1',
      title: 'Give Life Back to Music',
      artist: 'Daft Punk',
      album: 'Random Access Memories',
      duration: 274,
      coverUrl: 'https://picsum.photos/400/400?random=1',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: '2',
      title: 'The Game of Love',
      artist: 'Daft Punk',
      album: 'Random Access Memories',
      duration: 321,
      coverUrl: 'https://picsum.photos/400/400?random=1',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      id: '3',
      title: 'Giorgio by Moroder',
      artist: 'Daft Punk',
      album: 'Random Access Memories',
      duration: 544,
      coverUrl: 'https://picsum.photos/400/400?random=1',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
      id: '4',
      title: 'Get Lucky',
      artist: 'Daft Punk feat. Pharrell Williams',
      album: 'Random Access Memories',
      duration: 367,
      coverUrl: 'https://picsum.photos/400/400?random=1',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
  ],
};

export function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const { setMonetPalette } = useThemeStore();

  useEffect(() => {
    // TODO: Fetch album from API
    setAlbum(mockAlbum);

    // Apply Monet theme from album cover
    if (mockAlbum.coverUrl) {
      applyMonetTheme(mockAlbum.coverUrl).then((palette) => {
        setMonetPalette(palette);
      });
    }
  }, [id]);

  if (!album) {
    return null;
  }

  const totalDuration = album.tracks.reduce((acc, track) => acc + track.duration, 0);
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
  };

  return (
    <Box sx={{ pb: 12 }}>
      {/* Album Header */}
      <Box
        sx={{
          background: (theme) =>
            `linear-gradient(180deg, ${theme.palette.primary.main}40 0%, ${theme.palette.background.default} 100%)`,
          pt: 8,
          pb: 4,
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" spacing={3} alignItems="flex-end">
            <Avatar
              src={album.coverUrl}
              alt={album.title}
              variant="rounded"
              sx={{
                width: 232,
                height: 232,
                boxShadow: '0 4px 60px rgba(0,0,0,0.5)',
              }}
            />
            <Stack spacing={2} sx={{ flex: 1 }}>
              <Typography variant="caption" fontWeight={700} textTransform="uppercase">
                Album
              </Typography>
              <Typography variant="h2" fontWeight={900}>
                {album.title}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body1" fontWeight={700}>
                  {album.artist}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {album.year} • {album.tracks.length} songs, {formatDuration(totalDuration)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Album Controls */}
      <Box sx={{ bgcolor: 'background.default', py: 3 }}>
        <Container maxWidth="xl">
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              size="large"
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                width: 56,
                height: 56,
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <PlayArrow sx={{ fontSize: 32 }} />
            </IconButton>
            <IconButton size="large" onClick={() => setIsLiked(!isLiked)}>
              {isLiked ? <Favorite color="primary" /> : <FavoriteBorder />}
            </IconButton>
            <IconButton size="large">
              <MoreVert />
            </IconButton>
            {album.genre && (
              <Chip
                label={album.genre}
                sx={{ ml: 'auto' }}
                color="primary"
                variant="outlined"
              />
            )}
          </Stack>
        </Container>
      </Box>

      {/* Track List */}
      <Container maxWidth="xl">
        <TrackList tracks={album.tracks} />
      </Container>
    </Box>
  );
}
