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
import { PlayArrow, Pause, MoreVert, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Track } from '@/types';
import { usePlayerStore } from '@/stores/playerStore';
import { useLikedSongsStore } from '@/stores/likedSongsStore';
import { useToastStore } from '@/stores/toastStore';
import { PlayingAlbumCover } from '@/components/Player/PlayingAlbumCover';

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
  const { toggleLike, isLiked } = useLikedSongsStore();
  const { showToast } = useToastStore();

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

  const handleLikeClick = (e: React.MouseEvent, track: Track) => {
    e.stopPropagation();
    const wasLiked = isLiked(track.id);
    toggleLike(track);
    showToast(
      wasLiked ? 'Removed from Liked Songs' : 'Added to Liked Songs',
      wasLiked ? 'info' : 'success'
    );
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 50 }}>
                  {formatDuration(track.duration)}
                </Typography>
                <IconButton
                  edge="end"
                  size="small"
                  onClick={(e) => handleLikeClick(e, track)}
                  sx={{
                    color: isLiked(track.id) ? 'error.main' : 'text.secondary',
                    '&:hover': {
                      color: 'error.main',
                    },
                  }}
                >
                  {isLiked(track.id) ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
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
                <PlayingAlbumCover
                  coverUrl={track.coverUrl}
                  title={track.title}
                  size={48}
                  variant="rounded"
                  showVinyl={false}
                />
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
