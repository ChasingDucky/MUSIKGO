import { Box } from '@mui/material';
import { useThemeStore } from '@/stores/themeStore';
import { useEffect, useState } from 'react';

export function DynamicBackground() {
  const { monetPalette, mode } = useThemeStore();
  const [gradientColors, setGradientColors] = useState({
    color1: mode === 'dark' ? '#1a1a2e' : '#f0f4f8',
    color2: mode === 'dark' ? '#16213e' : '#d9e2ec',
    color3: mode === 'dark' ? '#0f3460' : '#b8c5d0',
  });

  useEffect(() => {
    if (monetPalette?.primary) {
      // Extract colors from the Monet palette
      const primary = monetPalette.primary.main;
      const secondary = monetPalette.secondary?.main || primary;
      const tertiary = monetPalette.tertiary?.main || primary;

      setGradientColors({
        color1: primary,
        color2: secondary,
        color3: tertiary,
      });
    }
  }, [monetPalette]);

  return (
    <>
      {/* Animated gradient background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: `
            radial-gradient(ellipse at 20% 20%, ${gradientColors.color1}40 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, ${gradientColors.color2}30 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, ${gradientColors.color3}20 0%, transparent 50%)
          `,
          backgroundColor: mode === 'dark' ? '#0a0a0f' : '#fafbfc',
          transition: 'all 1.5s ease',
        }}
      />

      {/* Animated blobs */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {/* Blob 1 */}
        <Box
          sx={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${gradientColors.color1}25, transparent 70%)`,
            top: '-20%',
            left: '-10%',
            animation: 'float 20s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': {
                transform: 'translate(0, 0) scale(1)',
              },
              '33%': {
                transform: 'translate(30px, -50px) scale(1.1)',
              },
              '66%': {
                transform: 'translate(-20px, 20px) scale(0.9)',
              },
            },
            filter: 'blur(60px)',
            opacity: 0.6,
          }}
        />

        {/* Blob 2 */}
        <Box
          sx={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${gradientColors.color2}20, transparent 70%)`,
            bottom: '-15%',
            right: '-5%',
            animation: 'float2 25s ease-in-out infinite',
            '@keyframes float2': {
              '0%, 100%': {
                transform: 'translate(0, 0) scale(1)',
              },
              '33%': {
                transform: 'translate(-40px, 30px) scale(1.15)',
              },
              '66%': {
                transform: 'translate(20px, -40px) scale(0.85)',
              },
            },
            filter: 'blur(70px)',
            opacity: 0.5,
          }}
        />

        {/* Blob 3 */}
        <Box
          sx={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${gradientColors.color3}15, transparent 70%)`,
            top: '40%',
            right: '10%',
            animation: 'float3 30s ease-in-out infinite',
            '@keyframes float3': {
              '0%, 100%': {
                transform: 'translate(0, 0) scale(1)',
              },
              '50%': {
                transform: 'translate(-60px, 60px) scale(1.2)',
              },
            },
            filter: 'blur(80px)',
            opacity: 0.4,
          }}
        />
      </Box>
    </>
  );
}
