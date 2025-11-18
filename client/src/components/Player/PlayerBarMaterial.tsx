import {
  Box,
  IconButton,
  Slider,
  Stack,
  Typography,
  Card,
  Avatar,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  Repeat,
  RepeatOne,
  Shuffle,
  VolumeUp,
  VolumeOff,
} from '@mui/icons-material';
import { usePlayerStore } from '@/stores/playerStore';
import { PlayingAlbumCover } from './PlayingAlbumCover';
import { AudioVisualizer } from './AudioVisualizer';

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function PlayerBarMaterial() {
  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    repeatMode,
    shuffleMode,
    togglePlayPause,
    next,
    previous,
    setVolume,
    toggleMute,
    seek,
    toggleRepeat,
    toggleShuffle,
  } = usePlayerStore();

  if (!currentTrack) {
    return null;
  }

  const handleSeek = (_: Event, value: number | number[]) => {
    seek(value as number);
  };

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    setVolume((value as number) / 100);
  };

  return (
    <Card
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        borderRadius: 0,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ px: 2, py: 1 }}>
        {/* Progress Bar */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="caption" sx={{ minWidth: 40, textAlign: 'right' }}>
            {formatTime(currentTime)}
          </Typography>
          <Slider
            size="small"
            value={currentTime}
            max={duration || 100}
            onChange={handleSeek}
            sx={{
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0px 0px 0px 8px rgba(103, 80, 164, 0.16)',
                },
              },
            }}
          />
          <Typography variant="caption" sx={{ minWidth: 40 }}>
            {formatTime(duration)}
          </Typography>
        </Stack>

        {/* Main Controls */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Track Info */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
            <PlayingAlbumCover
              coverUrl={currentTrack.coverUrl}
              title={currentTrack.title}
              size={56}
              variant="rounded"
              showVinyl={false}
            />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="body2" noWrap fontWeight={500}>
                {currentTrack.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {currentTrack.artist}
              </Typography>
            </Box>
            <AudioVisualizer
              bars={5}
              height={28}
              width={50}
              color="primary.main"
              gap={3}
            />
          </Stack>

          {/* Playback Controls */}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={toggleShuffle}
              color={shuffleMode ? 'primary' : 'default'}
              size="small"
            >
              <Shuffle />
            </IconButton>

            <IconButton onClick={previous} size="small">
              <SkipPrevious />
            </IconButton>

            <IconButton
              onClick={togglePlayPause}
              size="large"
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>

            <IconButton onClick={next} size="small">
              <SkipNext />
            </IconButton>

            <IconButton onClick={toggleRepeat} color={repeatMode !== 'off' ? 'primary' : 'default'} size="small">
              {repeatMode === 'one' ? <RepeatOne /> : <Repeat />}
            </IconButton>
          </Stack>

          {/* Volume Control */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ width: 150 }}>
            <IconButton
              size="small"
              onClick={toggleMute}
              color={isMuted || volume === 0 ? 'default' : 'primary'}
            >
              {isMuted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
            <Slider
              size="small"
              value={isMuted ? 0 : volume * 100}
              onChange={handleVolumeChange}
              sx={{
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                },
              }}
            />
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
