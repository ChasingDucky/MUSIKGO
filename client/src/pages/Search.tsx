import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Typography,
  Grid,
  CircularProgress,
  Stack,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { TrackList } from '@/components/TrackList/TrackList';
import { Track } from '@/types';
import { useMusicStore } from '@/stores/musicStore';

export function Search() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { searchTracks } = useMusicStore();

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);

    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchTracks(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Box sx={{ pb: 12 }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Search Header */}
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Search
            </Typography>
            <TextField
              fullWidth
              placeholder="Search for songs, artists, or albums..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: isSearching && (
                  <InputAdornment position="end">
                    <CircularProgress size={20} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                },
              }}
            />
          </Box>

          {/* Search Results */}
          {query && !isSearching && (
            <>
              {searchResults.length > 0 ? (
                <>
                  <Box>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      Results for "{query}"
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Found {searchResults.length} track{searchResults.length !== 1 ? 's' : ''}
                    </Typography>
                  </Box>
                  <TrackList tracks={searchResults} />
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    No results found for "{query}"
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Try different keywords or check your spelling
                  </Typography>
                </Box>
              )}
            </>
          )}

          {/* Browse Categories (when no search) */}
          {!query && (
            <>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Browse All
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {['Rock', 'Pop', 'Jazz', 'Classical', 'Electronic', 'Hip Hop'].map((genre) => (
                    <Grid item xs={6} sm={4} md={3} key={genre}>
                      <Box
                        sx={{
                          p: 3,
                          bgcolor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                          borderRadius: 2,
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      >
                        <Typography variant="h6" fontWeight={700} color="white">
                          {genre}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
