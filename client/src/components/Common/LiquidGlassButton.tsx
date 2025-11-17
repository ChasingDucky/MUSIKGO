import { Box, IconButton } from '@mui/material';
import { ReactNode } from 'react';
import { LiquidGlass } from './LiquidGlass';

interface LiquidGlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'rounded';
}

export function LiquidGlassButton({
  children,
  onClick,
  size = 'medium',
  variant = 'circular',
}: LiquidGlassButtonProps) {
  const sizeMap = {
    small: 42,
    medium: 54,
    large: 64,
  };

  const dimension = sizeMap[size];
  const borderRadius = variant === 'circular' ? '60px' : '16px';

  return (
    <LiquidGlass
      borderRadius={borderRadius}
      sx={{
        width: dimension,
        height: dimension,
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </Box>
    </LiquidGlass>
  );
}
