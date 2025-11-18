import { Box, Avatar, keyframes } from '@mui/material';
import { usePlayerStore } from '@/stores/playerStore';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(103, 80, 164, 0.7);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(103, 80, 164, 0);
  }
`;

interface PlayingAlbumCoverProps {
  coverUrl: string;
  title: string;
  size?: number;
  variant?: 'square' | 'circular' | 'rounded';
  showVinyl?: boolean;
}

export function PlayingAlbumCover({
  coverUrl,
  title,
  size = 48,
  variant = 'rounded',
  showVinyl = false,
}: PlayingAlbumCoverProps) {
  const { isPlaying } = usePlayerStore();

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
      }}
    >
      {/* Vinyl record effect (behind album cover) */}
      {showVinyl && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: size * 1.1,
            height: size * 1.1,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #222, #000)',
            animation: isPlaying ? `${rotate} 3s linear infinite` : 'none',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '30%',
              height: '30%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: '#000',
            },
          }}
        />
      )}

      {/* Album cover */}
      <Avatar
        src={coverUrl}
        alt={title}
        variant={variant}
        sx={{
          width: size,
          height: size,
          position: 'relative',
          zIndex: 1,
          animation: isPlaying && !showVinyl ? `${rotate} 20s linear infinite` : 'none',
          boxShadow: isPlaying
            ? '0 4px 20px rgba(0, 0, 0, 0.4)'
            : '0 2px 8px rgba(0, 0, 0, 0.2)',
          transition: 'box-shadow 0.3s ease',
          '&::after': isPlaying
            ? {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: variant === 'circular' ? '50%' : variant === 'rounded' ? 2 : 0,
                animation: `${pulse} 2s ease-in-out infinite`,
              }
            : undefined,
        }}
      />

      {/* Playing indicator */}
      {isPlaying && (
        <Box
          sx={{
            position: 'absolute',
            bottom: -2,
            right: -2,
            width: 16,
            height: 16,
            borderRadius: '50%',
            bgcolor: 'success.main',
            border: '2px solid',
            borderColor: 'background.paper',
            zIndex: 2,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: 'success.contrastText',
              animation: `${pulse} 1.5s ease-in-out infinite`,
            },
          }}
        />
      )}
    </Box>
  );
}
