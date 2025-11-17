import { Box, Typography, Stack, Button } from '@mui/material';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        textAlign: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center" maxWidth={400}>
        {icon && (
          <Box sx={{ fontSize: 64, color: 'text.disabled' }}>
            {icon}
          </Box>
        )}
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
        {action && (
          <Button
            variant="contained"
            onClick={action.onClick}
            sx={{ mt: 2 }}
          >
            {action.label}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
