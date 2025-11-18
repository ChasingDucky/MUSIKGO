import { ReactNode } from 'react';
import { Box, Fade, Slide } from '@mui/material';

interface PageTransitionProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  timeout?: number;
}

export function PageTransition({
  children,
  direction = 'up',
  timeout = 300
}: PageTransitionProps) {
  return (
    <Slide direction={direction} in={true} timeout={timeout}>
      <Box>
        <Fade in={true} timeout={timeout}>
          <Box>{children}</Box>
        </Fade>
      </Box>
    </Slide>
  );
}
