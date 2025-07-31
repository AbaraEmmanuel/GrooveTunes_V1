import React, { useEffect, useRef, useState } from 'react';
import { 
  IconButton, 
  Slider,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Popover
} from '@mui/material';
import { 
  PlayArrow, 
  Pause, 
  SkipNext, 
  SkipPrevious, 
  VolumeUp, 
  VolumeOff,
  FastForward, 
  FastRewind,
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';

const CustomAudioPlayer = ({ currentSong, songInfo, onSongEnd, onNext, onPrevious }) => {
  const audioRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [volumeAnchor, setVolumeAnchor] = useState(null);
  const volumeOpen = Boolean(volumeAnchor);

  // Format time to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;

      audioElement.pause();
      audioElement.src = currentSong;
      audioElement.load();

      const playAudio = () => {
        audioElement.play().catch(error => {
          console.error('Failed to play the audio:', error);
        });
        setIsPlaying(true);
      };

      audioElement.addEventListener('canplay', playAudio, { once: true });

      const handleLoadedMetadata = () => {
        setDuration(audioElement.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audioElement.currentTime);
        setProgress((audioElement.currentTime / audioElement.duration) * 100);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        if (onSongEnd) onSongEnd();
      };

      audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      audioElement.addEventListener('ended', handleEnded);

      return () => {
        audioElement.removeEventListener('canplay', playAudio);
        audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        audioElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSong]);

  const togglePlayPause = () => {
    const audioElement = audioRef.current;
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch(error => {
        console.error('Failed to play the audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    audioRef.current.volume = newValue / 100;
  };

  const handleProgressChange = (event, newValue) => {
    const newTime = (newValue / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(newValue);
  };

  const handleFastForward = () => {
    audioRef.current.currentTime += 10;
  };

  const handleRewind = () => {
    audioRef.current.currentTime -= 10;
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleVolumeClick = (event) => {
    setVolumeAnchor(event.currentTarget);
  };

  const handleVolumeClose = () => {
    setVolumeAnchor(null);
  };

  return (
    <Box 
      className="custom-audio-player"
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 3,
        borderRadius: isMobile ? 0 : '16px',
      }}
    >
      <Box className="player-content">
        <Box className="album-info">
          <img 
            src={songInfo?.albumArt || 'default-image-url'} 
            alt="Album Art" 
            className="album-art" 
          />
          <Box className="song-details">
            <Typography variant="body1" className="song-title">
              {songInfo?.name || 'Unknown Track'}
            </Typography>
            <Typography variant="body2" className="song-artist">
              {songInfo?.artists || 'Unknown Artist'}
            </Typography>
          </Box>
          <IconButton onClick={toggleFavorite} className="favorite-btn">
            {isFavorite ? <Favorite sx={{ color: '#ff4081' }} /> : <FavoriteBorder />}
          </IconButton>
        </Box>
        
        <Box className="controls-section">
          <Box className="controls">
            <IconButton onClick={onPrevious} className="control-btn">
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleRewind} className="control-btn">
              <FastRewind />
            </IconButton>
            <IconButton 
              onClick={togglePlayPause} 
              className="play-btn"
              sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton onClick={handleFastForward} className="control-btn">
              <FastForward />
            </IconButton>
            <IconButton onClick={onNext} className="control-btn">
              <SkipNext />
            </IconButton>
          </Box>
          
          <Box className="progress-container">
            <Typography variant="caption" className="time-display">
              {formatTime(currentTime)}
            </Typography>
            <Slider
              value={progress}
              onChange={handleProgressChange}
              aria-labelledby="progress-slider"
              className="progress-slider"
              sx={{ mx: 2, color: 'primary.main' }}
            />
            <Typography variant="caption" className="time-display">
              {formatTime(duration)}
            </Typography>
          </Box>
        </Box>
        
        <Box className="volume-section">
          {isMobile ? (
            <>
              <IconButton onClick={handleVolumeClick} className="volume-btn">
                {volume > 0 ? <VolumeUp /> : <VolumeOff />}
              </IconButton>
              <Popover
                open={volumeOpen}
                anchorEl={volumeAnchor}
                onClose={handleVolumeClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <Box sx={{ p: 2, height: '150px', display: 'flex', alignItems: 'center' }}>
                  <Slider
                    orientation="vertical"
                    value={volume}
                    onChange={handleVolumeChange}
                    aria-labelledby="volume-slider"
                    sx={{ height: '100px' }}
                  />
                </Box>
              </Popover>
            </>
          ) : (
            <Box className="volume-control">
              <IconButton className="volume-btn">
                {volume > 0 ? <VolumeUp /> : <VolumeOff />}
              </IconButton>
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                aria-labelledby="volume-slider"
                className="volume-slider"
                sx={{ width: '100px', color: 'primary.main' }}
              />
            </Box>
          )}
        </Box>
      </Box>
      
      <audio ref={audioRef} />
    </Box>
  );
};

export default CustomAudioPlayer;