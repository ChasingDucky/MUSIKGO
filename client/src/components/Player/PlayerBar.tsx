import {
  Box,
  Slider,
  Stack,
  Typography,
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
  Home,
  Search,
} from '@mui/icons-material';
import { usePlayerStore } from '@/stores/playerStore';
import { LiquidGlass } from '@/components/Common/LiquidGlass';
import { LiquidGlassButton } from '@/components/Common/LiquidGlassButton';
import { PlayingAlbumCover } from './PlayingAlbumCover';
import { AudioVisualizer } from './AudioVisualizer';
import { useNavigate } from 'react-router-dom';

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function PlayerBar() {
  const navigate = useNavigate();
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    repeatMode,
    shuffleMode,
    togglePlayPause,
    next,
    previous,
    setVolume,
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
    <>
      {/* SVG Filter Definition */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter
            id="liquid_glass_filter"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feDisplacementMap scale="200" />
          </filter>
        </defs>
      </svg>

      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          right: 16,
          zIndex: 1200,
          display: 'flex',
          gap: 2,
          px: 2,
        }}
      >
        {/* Home Button */}
        <LiquidGlassButton onClick={() => navigate('/')} size="medium">
          <Home sx={{ fontSize: 28, color: 'rgba(255, 255, 255, 0.8)' }} />
        </LiquidGlassButton>

        {/* Main Player */}
        <LiquidGlass
          borderRadius="26px"
          intensity="medium"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
          }}
        >
          {/* Progress Bar */}
          <Box sx={{ mb: 1.5 }}>
            <Slider
              size="small"
              value={currentTime}
              max={duration || 100}
              onChange={handleSeek}
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0px 0px 0px 8px rgba(255, 255, 255, 0.16)',
                  },
                },
                '& .MuiSlider-track': {
                  border: 'none',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                },
                '& .MuiSlider-rail': {
                  opacity: 0.3,
                  backgroundColor: '#fff',
                },
              }}
            />
          </Box>

          {/* Controls */}
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* Track Info */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
              <PlayingAlbumCover
                coverUrl={currentTrack.coverUrl}
                title={currentTrack.title}
                size={48}
                variant="rounded"
                showVinyl={false}
              />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="body1"
                  noWrap
                  fontWeight={600}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {currentTrack.title}
                </Typography>
                <Typography
                  variant="caption"
                  noWrap
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  {currentTrack.artist}
                </Typography>
              </Box>
              <AudioVisualizer
                bars={5}
                height={24}
                width={50}
                color="rgba(255, 255, 255, 0.6)"
                gap={3}
              />
            </Stack>

            {/* Playback Controls */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                onClick={toggleShuffle}
                sx={{
                  cursor: 'pointer',
                  opacity: shuffleMode ? 1 : 0.6,
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 1 },
                }}
              >
                <Shuffle sx={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.9)' }} />
              </Box>

              <Box
                onClick={previous}
                sx={{
                  cursor: 'pointer',
                  opacity: 0.8,
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 1 },
                }}
              >
                <SkipPrevious sx={{ fontSize: 32, color: 'rgba(255, 255, 255, 0.9)' }} />
              </Box>

              <Box
                onClick={togglePlayPause}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                }}
              >
                {isPlaying ? (
                  <Pause sx={{ fontSize: 28, color: '#fff' }} />
                ) : (
                  <PlayArrow sx={{ fontSize: 28, color: '#fff' }} />
                )}
              </Box>

              <Box
                onClick={next}
                sx={{
                  cursor: 'pointer',
                  opacity: 0.8,
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 1 },
                }}
              >
                <SkipNext sx={{ fontSize: 32, color: 'rgba(255, 255, 255, 0.9)' }} />
              </Box>

              <Box
                onClick={toggleRepeat}
                sx={{
                  cursor: 'pointer',
                  opacity: repeatMode !== 'off' ? 1 : 0.6,
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 1 },
                }}
              >
                {repeatMode === 'one' ? (
                  <RepeatOne sx={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.9)' }} />
                ) : (
                  <Repeat sx={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.9)' }} />
                )}
              </Box>
            </Stack>

            {/* Time Display */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 100 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {formatTime(currentTime)}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                /
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {formatTime(duration)}
              </Typography>
            </Stack>
          </Stack>
        </LiquidGlass>

        {/* Search Button */}
        <LiquidGlassButton onClick={() => navigate('/search')} size="medium">
          <Search sx={{ fontSize: 28, color: 'rgba(255, 255, 255, 0.8)' }} />
        </LiquidGlassButton>
      </Box>
    </>
  );
}
