import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, Stack } from '@mui/material';
import { Add, MusicNote } from '@mui/icons-material';
import { PlaylistCard } from '@/components/Playlist/PlaylistCard';
import { CreatePlaylistDialog } from '@/components/Playlist/CreatePlaylistDialog';
import { LoadingSpinner } from '@/components/Common/LoadingSpinner';
import { ErrorMessage } from '@/components/Common/ErrorMessage';
import { EmptyState } from '@/components/Common/EmptyState';
import { useMusicStore } from '@/stores/musicStore';
import { useNavigate } from 'react-router-dom';

export function Playlists() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { playlists, isLoading, error, fetchPlaylists } = useMusicStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaylists('demo-user'); // TODO: Get from auth
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading your playlists..." fullPage />;
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <ErrorMessage
          message={error}
          onRetry={() => fetchPlaylists('demo-user')}
        />
      </Container>
    );
  }

  return (
    <Box sx={{ pb: 12 }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" fontWeight={700}>
              Your Playlists
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setDialogOpen(true)}
              sx={{ borderRadius: 20 }}
            >
              Create Playlist
            </Button>
          </Box>

          {/* Playlists Grid */}
          {playlists.length > 0 ? (
            <Grid container spacing={3}>
              {playlists.map((playlist) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={playlist.id}>
                  <PlaylistCard
                    playlist={playlist}
                    onClick={(p) => navigate(`/playlist/${p.id}`)}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState
              icon={<MusicNote />}
              title="No playlists yet"
              description="Create your first playlist to organize your favorite tracks"
              action={{
                label: 'Create Playlist',
                onClick: () => setDialogOpen(true),
              }}
            />
          )}
        </Stack>
      </Container>

      <CreatePlaylistDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Box>
  );
}
