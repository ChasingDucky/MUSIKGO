import { AppBar, Toolbar, IconButton, Box, Avatar, Stack } from '@mui/material';
import {
  Brightness4,
  Brightness7,
  AccountCircle,
} from '@mui/icons-material';
import { useThemeStore } from '@/stores/themeStore';

export function Header() {
  const { mode, toggleMode } = useThemeStore();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'transparent',
        backdropFilter: 'blur(20px)',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={1}>
          <IconButton onClick={toggleMode} color="inherit">
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton color="inherit">
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
