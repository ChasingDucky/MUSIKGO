import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { useThemeStore } from './stores/themeStore';
import { getTheme } from './theme/theme';
import { Sidebar } from './components/Layout/Sidebar';
import { PlayerBar } from './components/Player/PlayerBar';
import { AudioPlayer } from './components/Player/AudioPlayer';
import { Home } from './pages/Home';
import { Library } from './pages/Library';

function App() {
  const { mode, monetPalette } = useThemeStore();
  const theme = useMemo(() => getTheme(mode, monetPalette), [mode, monetPalette]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              bgcolor: 'background.default',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
              <Route path="/search" element={<Box sx={{ p: 4 }}>Search Page Coming Soon</Box>} />
              <Route path="/liked" element={<Box sx={{ p: 4 }}>Liked Songs Coming Soon</Box>} />
            </Routes>
          </Box>
        </Box>
        <PlayerBar />
        <AudioPlayer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
