import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { useThemeStore } from './stores/themeStore';
import { getTheme } from './theme/theme';
import { Sidebar } from './components/Layout/Sidebar';
import { PlayerBar } from './components/Player/PlayerBar';
import { AudioPlayer } from './components/Player/AudioPlayer';
import { DynamicBackground } from './components/Common/DynamicBackground';
import { Home } from './pages/Home';
import { Library } from './pages/Library';
import { Search } from './pages/Search';
import { AlbumDetail } from './pages/AlbumDetail';
import { Playlists } from './pages/Playlists';

function App() {
  const { mode, monetPalette } = useThemeStore();
  const theme = useMemo(() => getTheme(mode, monetPalette), [mode, monetPalette]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DynamicBackground />
      <BrowserRouter>
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              position: 'relative',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
              <Route path="/search" element={<Search />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/album/:id" element={<AlbumDetail />} />
              <Route path="/playlist/:id" element={<AlbumDetail />} />
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
