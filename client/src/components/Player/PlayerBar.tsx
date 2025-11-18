import {
  Box,
  Slider,
  Stack,
  Typography,
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
    currentTime,
    duration,
    repeatMode,
    shuffleMode,
    togglePlayPause,
    next,
    previous,
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

  return (
    <>
      {/* SVG Filter Definition - Only shown on mobile */}
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
        {/* Home Button - Liquid Glass only on mobile */}
        <LiquidGlassButton onClick={() => navigate('/')} size="medium" mobileOnly={true}>
          <Home sx={{ fontSize: 28, color: 'text.primary' }} />
        </LiquidGlassButton>

        {/* Main Player - Regular card without liquid glass */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            borderRadius: '26px',
            bgcolor: 'background.paper',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
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
                color: 'primary.main',
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0px 0px 0px 8px rgba(103, 80, 164, 0.16)',
                  },
                },
                '& .MuiSlider-track': {
                  border: 'none',
                },
                '& .MuiSlider-rail': {
                  opacity: 0.2,
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
                    color: 'text.primary',
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {currentTrack.title}
                </Typography>
                <Typography
                  variant="caption"
                  noWrap
                  sx={{ color: 'text.secondary' }}
                >
                  {currentTrack.artist}
                </Typography>
              </Box>
              <AudioVisualizer
                bars={5}
                height={24}
                width={50}
                color="primary.main"
                gap={3}
              />
            </Stack>

            {/* Playback Controls */}
            <Stack direction="row" spacing={1} alignItems="center">
              <LiquidGlassButton onClick={toggleShuffle} size="small" mobileOnly={true}>
                <Shuffle
                  sx={{
                    fontSize: 24,
                    color: shuffleMode ? 'primary.main' : 'text.secondary',
                  }}
                />
              </LiquidGlassButton>

              <LiquidGlassButton onClick={previous} size="small" mobileOnly={true}>
                <SkipPrevious sx={{ fontSize: 32, color: 'text.primary' }} />
              </LiquidGlassButton>

              <LiquidGlassButton onClick={togglePlayPause} size="medium" mobileOnly={true}>
                {isPlaying ? (
                  <Pause sx={{ fontSize: 28, color: 'primary.main' }} />
                ) : (
                  <PlayArrow sx={{ fontSize: 28, color: 'primary.main' }} />
                )}
              </LiquidGlassButton>

              <LiquidGlassButton onClick={next} size="small" mobileOnly={true}>
                <SkipNext sx={{ fontSize: 32, color: 'text.primary' }} />
              </LiquidGlassButton>

              <LiquidGlassButton onClick={toggleRepeat} size="small" mobileOnly={true}>
                {repeatMode === 'one' ? (
                  <RepeatOne
                    sx={{
                      fontSize: 24,
                      color: 'primary.main',
                    }}
                  />
                ) : (
                  <Repeat
                    sx={{
                      fontSize: 24,
                      color: repeatMode !== 'off' ? 'primary.main' : 'text.secondary',
                    }}
                  />
                )}
              </LiquidGlassButton>
            </Stack>

            {/* Time Display */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 100 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {formatTime(currentTime)}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                /
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {formatTime(duration)}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Search Button - Liquid Glass only on mobile */}
        <LiquidGlassButton onClick={() => navigate('/search')} size="medium" mobileOnly={true}>
          <Search sx={{ fontSize: 28, color: 'text.primary' }} />
        </LiquidGlassButton>
      </Box>
    </>
  );
}
