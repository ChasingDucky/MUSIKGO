import {
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { PlayArrow, Pause, MoreVert } from '@mui/icons-material';
import { Track } from '@/types';
import { usePlayerStore } from '@/stores/playerStore';

interface TrackListProps {
  tracks: Track[];
  onTrackClick?: (track: Track, index: number) => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function TrackList({ tracks, onTrackClick }: TrackListProps) {
  const { currentTrack, isPlaying, setQueue, togglePlayPause } = usePlayerStore();

  const handleTrackClick = (track: Track, index: number) => {
    if (currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      setQueue(tracks, index);
      setTimeout(() => {
        usePlayerStore.getState().play();
      }, 100);
    }

    onTrackClick?.(track, index);
  };

  return (
    <List>
      {tracks.map((track, index) => {
        const isCurrentTrack = currentTrack?.id === track.id;
        const isTrackPlaying = isCurrentTrack && isPlaying;

        return (
          <ListItem
            key={track.id}
            disablePadding
            secondaryAction={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {formatDuration(track.duration)}
                </Typography>
                <IconButton edge="end" size="small">
                  <MoreVert />
                </IconButton>
              </Box>
            }
            sx={{
              bgcolor: isCurrentTrack ? 'action.selected' : 'transparent',
              '&:hover': {
                bgcolor: isCurrentTrack ? 'action.selected' : 'action.hover',
              },
            }}
          >
            <ListItemButton onClick={() => handleTrackClick(track, index)}>
              <ListItemAvatar>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={track.coverUrl}
                    alt={track.title}
                    variant="rounded"
                    sx={{ width: 48, height: 48 }}
                  />
                  {isCurrentTrack && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: 1,
                      }}
                    >
                      {isTrackPlaying ? (
                        <Pause sx={{ color: 'white' }} />
                      ) : (
                        <PlayArrow sx={{ color: 'white' }} />
                      )}
                    </Box>
                  )}
                </Box>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    fontWeight={isCurrentTrack ? 600 : 400}
                    color={isCurrentTrack ? 'primary' : 'text.primary'}
                  >
                    {track.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {track.artist} • {track.album}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
