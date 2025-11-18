import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { Album } from '@/types';
import { useState } from 'react';
import { applyMonetTheme } from '@/theme/monetColors';
import { useThemeStore } from '@/stores/themeStore';

interface AlbumCardMaterialProps {
  album: Album;
  onClick?: (album: Album) => void;
}

export function AlbumCardMaterial({ album, onClick }: AlbumCardMaterialProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { setMonetPalette } = useThemeStore();

  const handleCardClick = () => {
    onClick?.(album);
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

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        '&:hover': {
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        },
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
          }}
        />
        {isHovered && (
          <IconButton
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s',
            }}
            size="large"
          >
            <PlayArrow />
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
