import { Alert, AlertTitle, Box, Button, Stack } from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = 'Error',
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <Box sx={{ py: 4 }}>
      <Alert
        severity="error"
        sx={{
          borderRadius: 2,
        }}
      >
        <AlertTitle>{title}</AlertTitle>
        <Stack spacing={2}>
          {message}
          {onRetry && (
            <Box>
              <Button
                startIcon={<Refresh />}
                onClick={onRetry}
                variant="outlined"
                color="error"
                size="small"
              >
                Retry
              </Button>
            </Box>
          )}
        </Stack>
      </Alert>
    </Box>
  );
}
