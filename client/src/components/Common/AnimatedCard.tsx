import { Card, CardProps } from '@mui/material';
import { useState, ReactNode } from 'react';

interface AnimatedCardProps extends CardProps {
  children: ReactNode;
  hoverScale?: number;
}

export function AnimatedCard({
  children,
  hoverScale = 1.02,
  ...props
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        ...props.sx,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? `scale(${hoverScale}) translateY(-4px)` : 'scale(1) translateY(0)',
        '&:hover': {
          boxShadow: isHovered
            ? '0 12px 40px rgba(0, 0, 0, 0.2)'
            : '0px 1px 3px rgba(0, 0, 0, 0.12)',
          ...(props.sx as any)?.['&:hover'],
        },
      }}
    >
      {children}
    </Card>
  );
}
