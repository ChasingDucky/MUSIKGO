import { Box, Alert, Slide, Stack, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useToastStore } from '@/stores/toastStore';

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 80,
        right: 24,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <Stack spacing={2}>
        {toasts.map((toast) => (
          <Slide
            key={toast.id}
            direction="left"
            in={true}
            mountOnEnter
            unmountOnExit
          >
            <Alert
              severity={toast.type}
              sx={{
                pointerEvents: 'auto',
                minWidth: 300,
                maxWidth: 500,
                boxShadow: (theme) => theme.shadows[8],
                backdropFilter: 'blur(10px)',
                backgroundColor: (theme) =>
                  toast.type === 'success'
                    ? `${theme.palette.success.main}dd`
                    : toast.type === 'error'
                    ? `${theme.palette.error.main}dd`
                    : toast.type === 'warning'
                    ? `${theme.palette.warning.main}dd`
                    : `${theme.palette.info.main}dd`,
              }}
              action={
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={() => removeToast(toast.id)}
                >
                  <Close fontSize="small" />
                </IconButton>
              }
            >
              {toast.message}
            </Alert>
          </Slide>
        ))}
      </Stack>
    </Box>
  );
}
