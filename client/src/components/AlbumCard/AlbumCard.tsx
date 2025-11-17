import { CardMedia, Typography, Box } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { Album } from '@/types';
import { useState } from 'react';
import { applyMonetTheme } from '@/theme/monetColors';
import { useThemeStore } from '@/stores/themeStore';
import { LiquidGlass } from '@/components/Common/LiquidGlass';

interface AlbumCardProps {
  album: Album;
  onClick?: (album: Album) => void;
}

export function AlbumCard({ album, onClick }: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);
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

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      <LiquidGlass
        borderRadius="16px"
        intensity="light"
        sx={{
          overflow: 'hidden',
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
                transition: 'all 0.2s',
                animation: 'slideUp 0.3s ease',
                '@keyframes slideUp': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(10px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
                '&:hover': {
                  transform: 'scale(1.1)',
                  bgcolor: 'rgba(255, 255, 255, 1)',
                },
              }}
            >
              <PlayArrow sx={{ fontSize: 32, color: '#000' }} />
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
  );
}
