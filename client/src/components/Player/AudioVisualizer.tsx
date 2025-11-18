import { Box, keyframes } from '@mui/material';
import { usePlayerStore } from '@/stores/playerStore';

const bounce = (delay: number) => keyframes`
  0%, 100% {
    transform: scaleY(0.3);
  }
  50% {
    transform: scaleY(1);
  }
`;

interface AudioVisualizerProps {
  bars?: number;
  height?: number;
  width?: number;
  color?: string;
  gap?: number;
}

export function AudioVisualizer({
  bars = 5,
  height = 32,
  width = 60,
  color = 'rgba(255, 255, 255, 0.8)',
  gap = 3,
}: AudioVisualizerProps) {
  const { isPlaying } = usePlayerStore();

  const barWidth = (width - gap * (bars - 1)) / bars;

  // Generate random animation durations and delays for each bar
  const barAnimations = Array.from({ length: bars }, (_, i) => ({
    duration: 0.4 + Math.random() * 0.4, // 0.4s to 0.8s
    delay: i * 0.1, // Stagger effect
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: `${gap}px`,
        height,
        width,
      }}
    >
      {barAnimations.map((anim, index) => (
        <Box
          key={index}
          sx={{
            width: barWidth,
            height: '100%',
            bgcolor: color,
            borderRadius: 1,
            transformOrigin: 'bottom',
            animation: isPlaying
              ? `${bounce(anim.delay)} ${anim.duration}s ease-in-out infinite`
              : 'none',
            animationDelay: `${anim.delay}s`,
            transform: isPlaying ? undefined : 'scaleY(0.3)',
            transition: 'transform 0.3s ease',
          }}
        />
      ))}
    </Box>
  );
}
