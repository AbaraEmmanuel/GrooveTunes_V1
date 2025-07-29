import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Badge,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  PlayArrow, 
  Pause, 
  SkipNext, 
  SkipPrevious, 
  Search, 
  QueueMusic, 
  Logout,
  Home,
  AccountCircle,
  Delete
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserPlaylist, removeSongFromPlaylist } from '../services/playlistService';
import { useAuth } from '../context/AuthContext';

const Playlist = () => {
  const [songs, setSongs] = useState([]);
  const [playingSongId, setPlayingSongId] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongInfo, setCurrentSongInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { logout, currentUser } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        setIsLoading(true);
        const playlistSongs = await fetchUserPlaylist();
        setSongs(playlistSongs);
      } catch (error) {
        console.error('Error loading playlist:', error);
        setSnackbarMessage('Error loading playlist');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadPlaylist();
  }, []);

  const playSong = (songUrl, songInfo, index) => {
    setCurrentSong(songUrl);
    setCurrentSongInfo(songInfo);
    setPlayingSongId(songInfo.id);
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCardClick = (song, index) => {
    if (!song.preview_url) {
      setSnackbarMessage('Preview unavailable for this track');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    playSong(song.preview_url, {
      name: song.name,
      albumArt: song.albumArt,
      artists: song.artists,
      id: song.id
    }, index);
  };

  const handleRemoveFromPlaylist = async (songId) => {
    try {
      await removeSongFromPlaylist(songId);
      setSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
      
      if (songId === playingSongId) {
        setPlayingSongId(null);
        setCurrentSong(null);
        setCurrentSongInfo(null);
        setIsPlaying(false);
      }
      
      setSnackbarMessage('Song removed from playlist');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error removing song from playlist:', error);
      setSnackbarMessage('Error removing song');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleNextSong = () => {
    if (currentSongIndex !== null && currentSongIndex < songs.length - 1) {
      const nextSong = songs[currentSongIndex + 1];
      playSong(nextSong.preview_url, { 
        name: nextSong.name, 
        albumArt: nextSong.albumArt,
        artists: nextSong.artists,
        id: nextSong.id
      }, currentSongIndex + 1);
    }
  };

  const handlePreviousSong = () => {
    if (currentSongIndex !== null && currentSongIndex > 0) {
      const prevSong = songs[currentSongIndex - 1];
      playSong(prevSong.preview_url, { 
        name: prevSong.name, 
        albumArt: prevSong.albumArt,
        artists: prevSong.artists,
        id: prevSong.id
      }, currentSongIndex - 1);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f5f5f5, #ffffff)'
    }}>
      {/* App Bar - Same as homepage */}
      <AppBar position="sticky" sx={{ 
        backgroundColor: '#121212',
        backgroundImage: 'linear-gradient(rgba(29, 185, 84, 0.2), rgba(29, 185, 84, 0))',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Toolbar>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexGrow: 1 
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #1DB954, #1ED760)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: isMobile ? '1.25rem' : '1.5rem'
              }}
            >
              GrooveTunes
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              color="inherit" 
              component={Link} 
              to="/homepage" 
              sx={{ 
                mr: isMobile ? 0 : 2,
                color: '#ffffff'
              }}
            >
              <Home />
            </IconButton>
            <IconButton 
              color="inherit" 
              component={Link} 
              to="/playlist" 
              sx={{ 
                mr: isMobile ? 0 : 2,
                color: '#1DB954'
              }}
            >
              <QueueMusic />
            </IconButton>
            <IconButton 
              color="inherit" 
              component={Link} 
              to="/search" 
              sx={{ 
                mr: isMobile ? 0 : 2,
                color: '#ffffff'
              }}
            >
              <Search />
            </IconButton>
            <IconButton 
              color="inherit" 
              onClick={() => navigate('/profile')}
              sx={{ 
                mr: isMobile ? 0 : 2,
                color: '#ffffff'
              }}
            >
              <AccountCircle />
            </IconButton>
            <Button 
              variant="outlined" 
              color="inherit" 
              onClick={() => logout()}
              startIcon={<Logout />}
              sx={{ 
                ml: 2,
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  borderColor: '#ffffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              {!isMobile && 'Logout'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ 
        pt: 4,
        pb: currentSong ? '120px' : 4,
        minHeight: 'calc(100vh - 64px)'
      }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: '#1DB954',
              mb: 2
            }}
          >
            Your Playlist
          </Typography>
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            sx={{ 
              mb: 4,
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            {songs.length > 0 ? 'Your favorite tracks all in one place' : 'Your playlist is empty. Start adding some songs!'}
          </Typography>
        </Box>

        {isLoading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh'
          }}>
            <CircularProgress sx={{ color: '#1DB954' }} />
          </Box>
        ) : songs.length > 0 ? (
          <Grid container spacing={isMobile ? 2 : 4}>
            {songs.map((song, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
                <Card 
                  sx={{ 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    position: 'relative',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
                      cursor: 'pointer',
                      '& .play-button': {
                        opacity: 1,
                        transform: 'translateY(0)'
                      }
                    }
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <img 
                      src={song.albumArt || 'default-image-url'} 
                      alt={song.name} 
                      style={{ 
                        width: '100%', 
                        height: isMobile ? '180px' : '240px',
                        objectFit: 'cover',
                        display: 'block'
                      }} 
                    />
                    <Box 
                      className="play-button"
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: '#1DB954',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: playingSongId === song.id ? 1 : 0,
                        transform: playingSongId === song.id ? 'translateY(0)' : 'translateY(8px)',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        '&:hover': {
                          backgroundColor: '#1ED760',
                          transform: 'scale(1.1)'
                        },
                        backgroundColor: song.preview_url ? '#1DB954' : '#999',
                        cursor: song.preview_url ? 'pointer' : 'not-allowed',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(song, index);
                      }}
                    >
                      {song.preview_url ? (
                        playingSongId === song.id && isPlaying ? (
                          <Pause sx={{ color: '#fff' }} />
                        ) : (
                          <PlayArrow sx={{ color: '#fff' }} />
                        )
                      ) : (
                        <PlayArrow sx={{ color: '#ccc' }} />
                      )}
                    </Box>
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255, 0, 0, 0.7)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 0, 0, 0.9)'
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromPlaylist(song.id);
                      }}
                    >
                      <Delete sx={{ color: '#fff' }} />
                    </IconButton>
                  </Box>
                  <CardContent sx={{ 
                    backgroundColor: 'background.paper',
                    borderTop: '1px solid rgba(0, 0, 0, 0.1)'
                  }}>
                    <Typography 
                      gutterBottom 
                      variant="h6" 
                      component="div" 
                      sx={{ 
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {song.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {Array.isArray(song.artists) ? song.artists.map((artist) => artist.name).join(', ') : song.artists}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh'
          }}>
            <Typography variant="h6" color="textSecondary">
              Your playlist is empty. Add some songs!
            </Typography>
          </Box>
        )}
      </Container>

      {/* Player Bar - Same as homepage */}
      {currentSong && (
        <Box sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: '80px',
          backgroundColor: '#181818',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 1300,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.3)'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            width: '100%',
            maxWidth: '1400px',
            mx: 'auto'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              width: '30%',
              minWidth: '200px'
            }}>
              <img 
                src={currentSongInfo?.albumArt || 'default-image-url'} 
                alt={currentSongInfo?.name} 
                style={{ 
                  width: '56px', 
                  height: '56px',
                  borderRadius: '4px',
                  objectFit: 'cover',
                  marginRight: '16px'
                }} 
              />
              <Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '200px'
                  }}
                >
                  {currentSongInfo?.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '200px'
                  }}
                >
                  {currentSongInfo?.artists}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              px: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <IconButton 
                  onClick={handlePreviousSong}
                  disabled={currentSongIndex === 0}
                  sx={{ 
                    color: '#ffffff',
                    '&:hover': {
                      color: '#1DB954'
                    }
                  }}
                >
                  <SkipPrevious />
                </IconButton>
                <IconButton 
                  onClick={togglePlayPause}
                  sx={{ 
                    backgroundColor: '#1DB954',
                    color: '#ffffff',
                    mx: 2,
                    '&:hover': {
                      backgroundColor: '#1ED760',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
                <IconButton 
                  onClick={handleNextSong}
                  disabled={currentSongIndex === songs.length - 1}
                  sx={{ 
                    color: '#ffffff',
                    '&:hover': {
                      color: '#1DB954'
                    }
                  }}
                >
                  <SkipNext />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Snackbar for user feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity}
          sx={{ 
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Playlist;