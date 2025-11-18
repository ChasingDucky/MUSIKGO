import { CardMedia, Typography, Box, keyframes } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { Album } from '@/types';
import { useState, MouseEvent } from 'react';
import { applyMonetTheme } from '@/theme/monetColors';
import { useThemeStore } from '@/stores/themeStore';
import { LiquidGlass } from '@/components/Common/LiquidGlass';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

interface AlbumCardProps {
  album: Album;
  onClick?: (album: Album) => void;
}

export function AlbumCard({ album, onClick }: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const { setMonetPalette } = useThemeStore();

  const handleCardClick = () => {
    onClick?.(album);
  };

  const handleMouseEnter = async () => {
    setIsHovered(true);
    // Extract Monet colors from album cover
    try {
      const palette = await applyMonetTheme(album.coverUrl);
      setMonetPalette(palette);
    } catch (error) {
      console.error('Failed to apply Monet theme:', error);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -8; // Reduced from -10
    const rotateYValue = ((x - centerX) / centerX) * 8;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        perspective: '1000px',
        transition: 'transform 0.1s ease',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered
            ? `translateY(-12px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            : 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d',
        }}
      >
      <LiquidGlass
        borderRadius="16px"
        intensity="light"
        sx={{
          overflow: 'hidden',
          position: 'relative',
          '&::before': isHovered
            ? {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                backgroundSize: '200% 100%',
                animation: `${shimmer} 2s ease-in-out infinite`,
                zIndex: 1,
                pointerEvents: 'none',
              }
            : undefined,
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={album.coverUrl}
            alt={album.title}
            sx={{
              aspectRatio: '1/1',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              filter: isHovered ? 'brightness(0.8)' : 'brightness(1)',
            }}
          />
          {isHovered && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `slideUp 0.3s ease, ${float} 2s ease-in-out infinite`,
                '@keyframes slideUp': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(10px) scale(0.8)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0) scale(1)',
                  },
                },
                '&:hover': {
                  transform: 'scale(1.15)',
                  bgcolor: 'rgba(255, 255, 255, 1)',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              <PlayArrow sx={{ fontSize: 32, color: '#000', ml: 0.5 }} />
            </Box>
          )}
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            noWrap
            fontWeight={600}
            sx={{ color: 'rgba(255, 255, 255, 0.95)' }}
          >
            {album.title}
          </Typography>
          <Typography
            variant="body2"
            noWrap
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            {album.artist}
          </Typography>
          {album.year && (
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {album.year}
            </Typography>
          )}
        </Box>
      </LiquidGlass>
      </Box>
    </Box>
  );
}
