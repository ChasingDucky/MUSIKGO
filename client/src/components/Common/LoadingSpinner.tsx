import { Box, CircularProgress, Typography, Stack } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  fullPage?: boolean;
}

export function LoadingSpinner({ message = 'Loading...', fullPage = false }: LoadingSpinnerProps) {
  const content = (
    <Stack spacing={2} alignItems="center" justifyContent="center">
      <CircularProgress size={48} thickness={4} />
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Stack>
  );

  if (fullPage) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
        }}
      >
        {content}
      </Box>
    );
  }

  return <Box sx={{ py: 4 }}>{content}</Box>;
}
