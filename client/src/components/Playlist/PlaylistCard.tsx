import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { Playlist } from '@/types';
import { useState } from 'react';

interface PlaylistCardProps {
  playlist: Playlist;
  onClick?: (playlist: Playlist) => void;
}

export function PlaylistCard({ playlist, onClick }: PlaylistCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    onClick?.(playlist);
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
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
          image={playlist.coverUrl || 'https://picsum.photos/400/400?random=playlist'}
          alt={playlist.name}
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
          {playlist.name}
        </Typography>
        {playlist.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {playlist.description}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          {playlist.tracks.length} song{playlist.tracks.length !== 1 ? 's' : ''}
        </Typography>
      </CardContent>
    </Card>
  );
}
