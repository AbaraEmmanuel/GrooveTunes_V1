import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  useMediaQuery,
  Avatar,
  Stack,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  MusicNote, 
  PlaylistAdd, 
  PlayCircleOutline, 
  ArrowForward,
  TrendingUp,
  LibraryMusic,
  Headphones
} from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');
  
  const featureCards = [
    {
      icon: <LibraryMusic sx={{ fontSize: 40, color: '#fff' }} />,
      title: "Massive Music Library",
      description: "Over 100 million songs across all genres. Discover new music tailored to your taste.",
      color: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)'
    },
    {
      icon: <PlaylistAdd sx={{ fontSize: 40, color: '#fff' }} />,
      title: "Smart Playlists",
      description: "AI-powered playlists that adapt to your mood and listening habits.",
      color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    },
    {
      icon: <Headphones sx={{ fontSize: 40, color: '#fff' }} />,
      title: "Hi-Fi Audio",
      description: "Lossless audio quality for the ultimate listening experience.",
      color: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)'
    }
  ];

  const artists = [
    {
      name: "Davido",
      image: "https://media.premiumtimesng.com/wp-content/files/2023/07/Davido.png",
      followers: "23M",
      genre: "Afrobeats",
      info: "Grammy-nominated Nigerian superstar known for hits like 'Fall' and 'If'. Founded Davido Music Worldwide (DMW) record label."
    },
    {
      name: "Wizkid",
      image: "https://i.scdn.co/image/ab6761610000e5eb9050b61368975fda051cdc06",
      followers: "28M",
      genre: "Afrobeats",
      info: "First African artist to appear in the Guinness World Records. Collaborated with Drake on 'One Dance' which topped charts worldwide."
    },
    {
      name: "Burna Boy",
      image: "https://dailytrust.com/wp-content/uploads/2023/04/Burna-Boy-scaled-1.jpg",
      followers: "18M",
      genre: "Afro-fusion",
      info: "Grammy award winner who blends Afrobeat, dancehall, reggae and hip hop. His album 'Twice As Tall' won Best Global Music Album."
    }
  ];

  return (
    <Box sx={{ bgcolor: '#f9f9f9' }}>
      {/* Hero Section */}
      <Box
        sx={{
          pt: isMobile ? 4 : 12,
          pb: isMobile ? 6 : 15,
          background: 'linear-gradient(to bottom, #ffffff, #f5f5f5)',
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 80% 20%, rgba(29,185,84,0.1) 0%, transparent 60%)',
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: isMobile ? 2 : 4 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant={isMobile ? "h1" : "h1"}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 900,
                letterSpacing: isMobile ? '-0.5px' : '-1.5px',
                mb: 2,
                background: 'linear-gradient(to right, #1DB954, #1ED760)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                fontSize: isSmallMobile ? '2.5rem' : isMobile ? '3.5rem' : '6rem',
                lineHeight: 1.1,
                px: isMobile ? 1 : 0
              }}
            >
              GrooveTunes
            </Typography>
            <Typography
              variant={isMobile ? "h5" : "h3"}
              component="p"
              gutterBottom
              sx={{ 
                mb: 4,
                color: 'text.primary',
                fontWeight: 400,
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.3,
                fontSize: isMobile ? '1.1rem' : '1.75rem',
                px: isMobile ? 2 : 0
              }}
            >
              Elevate your music experience with crystal clear audio and personalized recommendations
            </Typography>
            <Box sx={{ mb: 6, px: isMobile ? 2 : 0 }}>
              <Button
                variant="contained"
                color="primary"
                size={isMobile ? "medium" : "large"}
                component={Link}
                to="/login"
                endIcon={<ArrowForward />}
                sx={{ 
                  borderRadius: '50px',
                  px: isMobile ? 4 : 5,
                  py: isMobile ? 1 : 1.5,
                  fontWeight: 700,
                  boxShadow: '0 4px 20px rgba(29, 185, 84, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 24px rgba(29, 185, 84, 0.4)'
                  },
                  transition: 'all 0.3s ease',
                  fontSize: isMobile ? '0.9rem' : '1.1rem'
                }}
              >
                Explore Music
              </Button>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
              px: isMobile ? 2 : 0
            }}>
              {[1, 2, 3, 4].map((item) => (
                <Avatar 
                  key={item} 
                  src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item}.jpg`}
                  sx={{ 
                    width: isMobile ? 40 : 48, 
                    height: isMobile ? 40 : 48,
                    border: '3px solid #fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
              ))}
              <Typography variant="body1" sx={{ 
                fontWeight: 600, 
                color: 'text.secondary',
                fontSize: isMobile ? '0.9rem' : '1rem'
              }}>
                Join <Box component="span" sx={{ color: '#1DB954' }}>--</Box> happy users
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ 
        py: isMobile ? 4 : 10, 
        position: 'relative',
        px: isMobile ? 2 : 4
      }}>
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(29,185,84,0.1) 0%, transparent 70%)',
            zIndex: 0
          }}
        />
        <Typography
          variant={isMobile ? "h4" : "h3"}
          component="h2"
          gutterBottom
          sx={{ 
            fontWeight: 800, 
            textAlign: 'center',
            mb: isMobile ? 4 : 8,
            color: 'text.primary',
            position: 'relative',
            zIndex: 1,
            fontSize: isMobile ? '1.75rem' : '2.5rem'
          }}
        >
          Why <Box component="span" sx={{ color: '#1DB954' }}>GrooveTunes</Box>?
        </Typography>
        <Grid container spacing={isMobile ? 2 : 4} sx={{ position: 'relative', zIndex: 1 }}>
          {featureCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: isMobile ? 3 : 4,
                  borderRadius: '20px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  background: card.color,
                  color: '#fff',
                  '&:hover': {
                    transform: isMobile ? 'none' : 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                  }
                }}
              >
                <Box sx={{ 
                  width: isMobile ? 60 : 80, 
                  height: isMobile ? 60 : 80, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  mb: isMobile ? 2 : 3,
                  mx: 'auto'
                }}>
                  {card.icon}
                </Box>
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  sx={{ 
                    fontWeight: 700, 
                    mb: isMobile ? 1 : 2,
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: isMobile ? '1.25rem' : '1.5rem'
                  }}
                >
                  {card.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    mb: isMobile ? 2 : 3,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    textAlign: 'center'
                  }}
                >
                  {card.description}
                </Typography>
                <Button
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  to="/login"
                  size={isMobile ? "small" : "medium"}
                  endIcon={<ArrowForward />}
                  sx={{ 
                    mt: 'auto',
                    alignSelf: 'center',
                    fontWeight: 600,
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.3)',
                    '&:hover': {
                      borderColor: '#fff',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    },
                    fontSize: isMobile ? '0.8rem' : '0.9rem'
                  }}
                >
                  Learn more
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Trending Artists */}
      <Box sx={{ 
        py: isMobile ? 4 : 10, 
        bgcolor: 'background.paper',
        px: isMobile ? 2 : 0
      }}>
        <Container maxWidth="lg" sx={{ px: isMobile ? 2 : 4 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: isMobile ? 4 : 6,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h2"
              sx={{ 
                fontWeight: 800,
                color: 'text.primary',
                fontSize: isMobile ? '1.75rem' : '2.5rem'
              }}
            >
              Trending <Box component="span" sx={{ color: '#1DB954' }}>Artists</Box>
            </Typography>
            <Button
              variant="text"
              color="primary"
              size={isMobile ? "small" : "medium"}
              endIcon={<ArrowForward />}
              sx={{ 
                fontWeight: 700,
                fontSize: isMobile ? '0.9rem' : '1rem'
              }}
            >
              View all artists
            </Button>
          </Box>
          <Grid container spacing={isMobile ? 2 : 4}>
            {artists.map((artist, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: '16px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      transform: isMobile ? 'none' : 'translateY(-8px)',
                      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? 240 : 320}
                    image={artist.image}
                    alt={artist.name}
                    sx={{
                      objectFit: 'cover',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px'
                    }}
                  />
                  <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                    <Typography
                      gutterBottom
                      variant={isMobile ? "h6" : "h5"}
                      component="div"
                      sx={{ 
                        fontWeight: 800,
                        color: 'text.primary',
                        fontSize: isMobile ? '1.25rem' : '1.5rem'
                      }}
                    >
                      {artist.name}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', rowGap: 1 }}>
                      <Chip 
                        label={artist.genre} 
                        size="small" 
                        sx={{ 
                          backgroundColor: 'rgba(29, 185, 84, 0.1)',
                          color: '#1DB954',
                          fontWeight: 600,
                          fontSize: isMobile ? '0.7rem' : '0.8rem'
                        }} 
                      />
                      <Chip 
                        icon={<TrendingUp sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }} />}
                        label={`${artist.followers} followers`} 
                        size="small" 
                        sx={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.05)',
                          fontWeight: 600,
                          fontSize: isMobile ? '0.7rem' : '0.8rem'
                        }} 
                      />
                    </Stack>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        fontSize: isMobile ? '0.8rem' : '0.9rem'
                      }}
                    >
                      {artist.info}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        py: isMobile ? 6 : 12,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #121212 100%)',
        color: '#fff',
        px: isMobile ? 2 : 0
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center', px: isMobile ? 2 : 4 }}>
          <Typography
            variant={isMobile ? "h4" : "h2"}
            component="h2"
            gutterBottom
            sx={{ 
              fontWeight: 800,
              mb: 3,
              color: '#fff',
              fontSize: isMobile ? '1.75rem' : '2.5rem'
            }}
          >
            Ready to transform your music experience?
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h5"}
            component="p"
            gutterBottom
            sx={{ 
              mb: 5,
              color: 'rgba(255,255,255,0.8)',
              maxWidth: 700,
              mx: 'auto',
              fontSize: isMobile ? '1rem' : '1.5rem'
            }}
          >
            GrooveTunes is your gateway to a world of music. Join millions of users who enjoy high-quality audio, personalized playlists, and a vast library of songs.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? "medium" : "large"}
            component={Link}
            to="/login"
            endIcon={<ArrowForward />}
            sx={{ 
              borderRadius: '50px',
              px: isMobile ? 4 : 6,
              py: isMobile ? 1 : 1.8,
              fontWeight: 700,
              boxShadow: '0 4px 20px rgba(29, 185, 84, 0.4)',
              fontSize: isMobile ? '0.9rem' : '1.1rem',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 24px rgba(29, 185, 84, 0.5)'
              },
              transition: 'all 0.3s ease',
              backgroundColor: '#1DB954'
            }}
          >
            Explore Music
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;