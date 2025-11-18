import { Box, Container, Typography, Stack, IconButton } from '@mui/material';
import { Favorite, PlayArrow } from '@mui/icons-material';
import { TrackList } from '@/components/TrackList/TrackList';
import { useLikedSongsStore } from '@/stores/likedSongsStore';
import { EmptyState } from '@/components/Common/EmptyState';

export function LikedSongs() {
  const { likedTracks } = useLikedSongsStore();

  return (
    <Box sx={{ pb: 12 }}>
      {/* Header */}
      <Box
        sx={{
          background: (theme) =>
            `linear-gradient(180deg, ${theme.palette.error.main}40 0%, ${theme.palette.background.default} 100%)`,
          pt: 8,
          pb: 4,
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" spacing={3} alignItems="flex-end">
            <Box
              sx={{
                width: 232,
                height: 232,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: (theme) => `${theme.palette.error.main}`,
                borderRadius: 2,
                boxShadow: '0 4px 60px rgba(0,0,0,0.5)',
              }}
            >
              <Favorite sx={{ fontSize: 120, color: 'white' }} />
            </Box>
            <Stack spacing={2} sx={{ flex: 1 }}>
              <Typography variant="caption" fontWeight={700} textTransform="uppercase">
                Playlist
              </Typography>
              <Typography variant="h2" fontWeight={900}>
                Liked Songs
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {likedTracks.length} {likedTracks.length === 1 ? 'song' : 'songs'}
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Play Button */}
      {likedTracks.length > 0 && (
        <Box sx={{ bgcolor: 'background.default', py: 3 }}>
          <Container maxWidth="xl">
            <IconButton
              size="large"
              sx={{
                bgcolor: 'error.main',
                color: 'white',
                width: 56,
                height: 56,
                '&:hover': {
                  bgcolor: 'error.dark',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <PlayArrow sx={{ fontSize: 32 }} />
            </IconButton>
          </Container>
        </Box>
      )}

      {/* Track List */}
      <Container maxWidth="xl">
        {likedTracks.length > 0 ? (
          <TrackList tracks={likedTracks} />
        ) : (
          <EmptyState
            title="No liked songs yet"
            message="Songs you like will appear here. Start exploring and add some favorites!"
          />
        )}
      </Container>
    </Box>
  );
}
