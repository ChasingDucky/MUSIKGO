import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

interface LiquidGlassProps extends BoxProps {
  children: ReactNode;
  borderRadius?: string | number;
  intensity?: 'light' | 'medium' | 'strong';
}

export function LiquidGlass({
  children,
  borderRadius = '26px',
  intensity = 'medium',
  sx,
  ...props
}: LiquidGlassProps) {
  const intensityConfig = {
    light: {
      cover: 'rgba(0, 0, 0, 0.08)',
      blur: '2px',
    },
    medium: {
      cover: 'rgba(0, 0, 0, 0.12)',
      blur: '4px',
    },
    strong: {
      cover: 'rgba(0, 0, 0, 0.18)',
      blur: '8px',
    },
  };

  const config = intensityConfig[intensity];

  return (
    <Box
      {...props}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius,
        ...sx,
      }}
    >
      {/* Outer displacement layer */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          borderRadius,
          backdropFilter: 'url(#liquid_glass_filter)',
          WebkitMaskImage: `
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect x="0" y="0" width="100%" height="100%" rx="0" ry="0" fill="white"/></svg>'),
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect x="5" y="5" width="calc(100% - 10px)" height="calc(100% - 10px)" rx="${borderRadius}" ry="${borderRadius}" fill="white"/></svg>')
          `,
          maskImage: `
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect x="0" y="0" width="100%" height="100%" rx="0" ry="0" fill="white"/></svg>'),
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect x="5" y="5" width="calc(100% - 10px)" height="calc(100% - 10px)" rx="${borderRadius}" ry="${borderRadius}" fill="white"/></svg>')
          `,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Cover layer */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          borderRadius,
          backdropFilter: `blur(${config.blur})`,
          WebkitBackdropFilter: `blur(${config.blur})`,
          background: config.cover,
        }}
      />

      {/* Sharp edges layer */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          borderRadius,
          boxShadow: `
            inset 1px 1px 0px 0px rgba(255, 255, 255, 0.5),
            inset -1px -1px 0px 0px rgba(255, 255, 255, 0.6)
          `,
        }}
      />

      {/* Reflection layer */}
      <Box
        sx={{
          position: 'absolute',
          inset: '1px',
          zIndex: 2,
          borderRadius,
          boxShadow: `
            inset 2px 2px 6px 2px rgba(255, 255, 255, 0.2),
            inset -2px -2px 4px -1px rgba(255, 255, 255, 0.2)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 4,
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
