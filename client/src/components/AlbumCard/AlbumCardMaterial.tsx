import { Card, CardMedia, CardContent, Typography, Box, IconButton, keyframes } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { Album } from '@/types';
import { useState, MouseEvent } from 'react';
import { applyMonetTheme } from '@/theme/monetColors';
import { useThemeStore } from '@/stores/themeStore';

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

interface AlbumCardMaterialProps {
  album: Album;
  onClick?: (album: Album) => void;
}

export function AlbumCardMaterial({ album, onClick }: AlbumCardMaterialProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const { setMonetPalette } = useThemeStore();

  const handleCardClick = () => {
    onClick?.(album);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = async () => {
    setIsHovered(true);
    try {
      const palette = await applyMonetTheme(album.coverUrl);
      setMonetPalette(palette);
    } catch (error) {
      console.error('Failed to apply Monet theme:', error);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered
          ? `translateY(-12px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        '&:hover': {
          boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.2)',
        },
        '&::before': isHovered ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: `${shimmer} 2s ease-in-out infinite`,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 1,
        } : undefined,
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
            transition: 'filter 0.3s ease',
            filter: isHovered ? 'brightness(0.7)' : 'brightness(1)',
          }}
        />
        {isHovered && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              animation: `${float} 2s ease-in-out infinite`,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'scale(1.15)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            size="large"
          >
            <PlayArrow sx={{ fontSize: 28 }} />
          </IconButton>
        )}
      </Box>
      <CardContent>
        <Typography variant="h6" noWrap fontWeight={600}>
          {album.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {album.artist}
        </Typography>
        {album.year && (
          <Typography variant="caption" color="text.secondary">
            {album.year}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
