"use client"
import { useState, useEffect } from "react"
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
  useMediaQuery,
  useTheme,
  IconButton,
  Divider,
  Chip,
  Tooltip,
  Fade,
  Grow,
  Slide,
} from "@mui/material"
import { Link } from "react-router-dom"
import {
  MusicNote,
  PlaylistAdd,
  Search,
  Headphones,
  Favorite,
  FavoriteBorder,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  Equalizer,
  Explore,
  TrendingUp,
  Close,
  MoreHoriz,
  Share,
  Add,
  Person,
  Settings,
  Notifications,
  Menu as MenuIcon,
  Home as HomeIcon,
  LibraryMusic,
  Album,
  Mic,
  QueueMusic,
} from "@mui/icons-material"
import CustomAudioPlayer from "./CustomAudioPlayer" // Import your custom audio player

const Home = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isMedium = useMediaQuery(theme.breakpoints.down("md"))

  // State for animations
  const [animateHero, setAnimateHero] = useState(false)
  const [animateFeatures, setAnimateFeatures] = useState(false)
  const [animatePlaylists, setAnimatePlaylists] = useState(false)
  const [animateArtists, setAnimateArtists] = useState(false)

  // State for interactive elements
  const [hoveredPlaylist, setHoveredPlaylist] = useState(null)
  const [hoveredArtist, setHoveredArtist] = useState(null)
  const [likedArtists, setLikedArtists] = useState({})

  // State for the currently playing track
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Trigger animations on scroll
  useEffect(() => {
    setAnimateHero(true)

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 300) setAnimateFeatures(true)
      if (scrollPosition > 800) setAnimatePlaylists(true)
      if (scrollPosition > 1500) setAnimateArtists(true)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Toggle like for an artist
  const toggleLike = (artistId, event) => {
    event.stopPropagation()
    setLikedArtists((prev) => ({
      ...prev,
      [artistId]: !prev[artistId],
    }))
  }

  // Featured playlists data with audio tracks
  const featuredPlaylists = [
    {
      id: 1,
      title: "Afrobeats Essentials",
      image: "https://i.scdn.co/image/ab67706f00000003b70e0223f544b1faa2e95ed0",
      songs: 42,
      followers: "2.3M",
      curator: "GrooveTunes",
      description: "The essential Afrobeats tracks you need in your playlist right now.",
      color: "linear-gradient(135deg, #FF9966, #FF5E62)",
      tracks: [
        {
          id: "track1",
          title: "Last Last",
          artist: "Burna Boy",
          audioSrc: "/audio/last-last.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
          duration: "3:42",
        },
        {
          id: "track2",
          title: "Rush",
          artist: "Ayra Starr",
          audioSrc: "/audio/rush.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273908280d9807127e185b71d87",
          duration: "3:05",
        },
      ],
    },
    {
      id: 2,
      title: "Chill Vibes",
      image: "https://i.scdn.co/image/ab67706f00000003e8e28219724c2423afa4d320",
      songs: 35,
      followers: "1.8M",
      curator: "GrooveTunes",
      description: "Relax and unwind with these smooth tracks.",
      color: "linear-gradient(135deg, #43CBFF, #9708CC)",
      tracks: [
        {
          id: "track3",
          title: "Calm Down",
          artist: "Rema",
          audioSrc: "/audio/calm-down.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273f29d0c86f34e5d062a5c41e3",
          duration: "3:59",
        },
        {
          id: "track4",
          title: "Essence",
          artist: "Wizkid ft. Tems",
          audioSrc: "/audio/essence.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273c5e2f328b0efb49b09bd22fd",
          duration: "4:09",
        },
      ],
    },
    {
      id: 3,
      title: "Workout Beats",
      image: "https://i.scdn.co/image/ab67706f000000034d26d431869cabfc53c67d8e",
      songs: 50,
      followers: "3.1M",
      curator: "GrooveTunes",
      description: "High-energy tracks to fuel your workout.",
      color: "linear-gradient(135deg, #FFC371, #FF5F6D)",
      tracks: [
        {
          id: "track5",
          title: "Sungba (Remix)",
          artist: "Asake ft. Burna Boy",
          audioSrc: "/audio/sungba.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273b5a0c2f8da6f6e7f3ebd8336",
          duration: "3:30",
        },
        {
          id: "track6",
          title: "Finesse",
          artist: "Pheelz ft. BNXN",
          audioSrc: "/audio/finesse.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273ba24e4d731ac1c6b4c8dec31",
          duration: "3:18",
        },
      ],
    },
  ]

  // Artist data with tracks
  const artists = [
    {
      id: 1,
      name: "Davido",
      image: "https://media.premiumtimesng.com/wp-content/files/2023/07/Davido.png",
      description: "Nigerian singer & producer",
      followers: "4.2M",
      monthlyListeners: "12.5M",
      topCity: "Lagos",
      verified: true,
      genres: ["Afrobeats", "Pop", "R&B"],
      color: "linear-gradient(135deg, #FF9966, #FF5E62)",
      tracks: [
        {
          id: "track7",
          title: "Unavailable",
          artist: "Davido ft. Musa Keys",
          audioSrc: "/audio/unavailable.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273c5e2f328b0efb49b09bd22fd",
          duration: "3:55",
        },
      ],
    },
    {
      id: 2,
      name: "Wizkid",
      image: "https://i.scdn.co/image/ab6761610000e5eb9050b61368975fda051cdc06",
      description: "Nigerian singer & songwriter",
      followers: "5.8M",
      monthlyListeners: "15.2M",
      topCity: "London",
      verified: true,
      genres: ["Afrobeats", "Afrofusion", "R&B"],
      color: "linear-gradient(135deg, #43CBFF, #9708CC)",
      tracks: [
        {
          id: "track8",
          title: "Essence",
          artist: "Wizkid ft. Tems",
          audioSrc: "/audio/essence.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273c5e2f328b0efb49b09bd22fd",
          duration: "4:09",
        },
      ],
    },
    {
      id: 3,
      name: "Burna Boy",
      image: "https://dailytrust.com/wp-content/uploads/2023/04/Burna-Boy-scaled-1.jpg",
      description: "Nigerian singer & performer",
      followers: "6.1M",
      monthlyListeners: "18.7M",
      topCity: "New York",
      verified: true,
      genres: ["Afrobeats", "Dancehall", "Reggae"],
      color: "linear-gradient(135deg, #FFC371, #FF5F6D)",
      tracks: [
        {
          id: "track9",
          title: "Last Last",
          artist: "Burna Boy",
          audioSrc: "/audio/last-last.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
          duration: "3:42",
        },
      ],
    },
  ]

  // Function to play a track from a playlist
  const playPlaylist = (playlist) => {
    if (playlist.tracks && playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0])
      setIsPlayerVisible(true)
      setIsPlayerMinimized(false)
    }
  }

  // Function to play a track from an artist
  const playArtist = (artist) => {
    if (artist.tracks && artist.tracks.length > 0) {
      setCurrentTrack(artist.tracks[0])
      setIsPlayerVisible(true)
      setIsPlayerMinimized(false)
    }
  }

  // Function to close the player
  const closePlayer = () => {
    setIsPlayerVisible(false)
    setCurrentTrack(null)
  }

  // Function to minimize the player
  const togglePlayerMinimize = () => {
    setIsPlayerMinimized(!isPlayerMinimized)
  }

  return (
    <Box 
      sx={{ 
        bgcolor: "#121212", 
        color: "#fff", 
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          background: "radial-gradient(circle at top right, rgba(29, 185, 84, 0.3), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100vh",
          background: "radial-gradient(circle at bottom left, rgba(29, 185, 84, 0.2), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }
      }}
    >
      {/* Side Navigation (visible on larger screens) */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "240px",
          bgcolor: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          p: 2,
          zIndex: 1200,
          transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <MusicNote sx={{ color: "#1DB954", fontSize: 32, mr: 1 }} />
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", color: "#1DB954" }}>
            GrooveTunes
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ color: "rgba(255,255,255,0.5)", mb: 2, pl: 2 }}>
            MENU
          </Typography>
          
          <Button
            startIcon={<HomeIcon />}
            sx={{
              color: "#fff",
              justifyContent: "flex-start",
              py: 1.5,
              px: 2,
              borderRadius: "8px",
              width: "100%",
              mb: 1,
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
            }}
          >
            Home
          </Button>
          
          <Button
            startIcon={<Search />}
            sx={{
              color: "rgba(255,255,255,0.7)",
              justifyContent: "flex-start",
              py: 1.5,
              px: 2,
              borderRadius: "8px",
              width: "100%",
              mb: 1,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            Search
          </Button>
          
          <Button
            startIcon={<LibraryMusic />}
            sx={{
              color: "rgba(255,255,255,0.7)",
              justifyContent: "flex-start",
              py: 1.5,
              px: 2,
              borderRadius: "8px",
              width: "100%",
              mb: 1,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            Your Library
          </Button>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ color: "rgba(255,255,255,0.5)", mb: 2, pl: 2 }}>
            YOUR MUSIC
          </Typography>
          
          <Button
            startIcon={<Favorite />}
            sx={{
              color: "rgba(255,255,255,0.7)",
              justifyContent: "flex-start",
              py: 1.5,
              px: 2,
              borderRadius: "8px",
              width: "100%",
              mb: 1,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            Liked Songs
          </Button>
          
          <Button
            startIcon={<Album />}
            sx={{
              color: "rgba(255,255,255,0.7)",
              justifyContent: "flex-start",
              py: 1.5,
              px: 2,
              borderRadius: "8px",
              width: "100%",
              mb: 1,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            Albums
          </Button>
          
          <Button
            startIcon={<Mic />}
            sx={{
              color: "rgba(255,255,255,0.7)",
              justifyContent: "flex-start",
              py: 1.5,
              px: 2,
              borderRadius: "8px",
              width: "100%",
              mb: 1,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            Artists
          </Button>
          
          <Button
            startIcon={<QueueMusic />}
            sx={{
              color: "rgba(255,255,255,0.7)",
              justifyContent: "flex-start",
              py: 1.5,
              px: 2,
              borderRadius: "8px",
              width: "100%",
              mb: 1,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            Playlists
          </Button>
        </Box>
        
        <Box sx={{ mt: "auto" }}>
          <Button
            startIcon={<Settings />}
            sx={{
              color: "rgba(255,255,255,0.7)",
              justifyContent: "flex-start",
              py: 1.5,
              px: 2,
              borderRadius: "8px",
              width: "100%",
              mb: 1,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            Settings
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          ml: { xs: 0, lg: "240px" },
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Navigation Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            backdropFilter: "blur(20px)",
            bgcolor: "rgba(18,18,18,0.8)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton 
              sx={{ 
                color: "#fff", 
                display: { xs: "flex", lg: "none" },
                mr: 1,
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon />
            </IconButton>
            
            <Box sx={{ display: { xs: "flex", lg: "none" }, alignItems: "center" }}>
              <MusicNote sx={{ color: "#1DB954", fontSize: 28, mr: 1 }} />
              <Typography variant="h6" component="h1" sx={{ fontWeight: "bold", color: "#1DB954" }}>
                GrooveTunes
              </Typography>
            </Box>
            
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                ml: 4,
              }}
            >
              <Button
                sx={{
                  color: "#fff",
                  mx: 1,
                  position: "relative",
                  "&:hover": { 
                    color: "#1DB954",
                    "&::after": {
                      width: "100%",
                    }
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "0%",
                    height: "2px",
                    bgcolor: "#1DB954",
                    transition: "width 0.3s ease",
                  }
                }}
              >
                Discover
              </Button>
              <Button
                sx={{
                  color: "#fff",
                  mx: 1,
                  position: "relative",
                  "&:hover": { 
                    color: "#1DB954",
                    "&::after": {
                      width: "100%",
                    }
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "0%",
                    height: "2px",
                    bgcolor: "#1DB954",
                    transition: "width 0.3s ease",
                  }
                }}
              >
                Browse
              </Button>
              <Button
                sx={{
                  color: "#fff",
                  mx: 1,
                  position: "relative",
                  "&:hover": { 
                    color: "#1DB954",
                    "&::after": {
                      width: "100%",
                    }
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "0%",
                    height: "2px",
                    bgcolor: "#1DB954",
                    transition: "width 0.3s ease",
                  }
                }}
              >
                Radio
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                position: "relative",
                mr: 2,
                display: { xs: "none", sm: "block" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  px: 2,
                  py: 0.5,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                <Search sx={{ color: "rgba(255,255,255,0.7)", mr: 1 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Search...
                </Typography>
              </Box>
            </Box>
            
            <IconButton sx={{ color: "#fff", display: { xs: "flex", sm: "none" } }}>
              <Search />
            </IconButton>
            
            <Tooltip title="Notifications" arrow>
              <IconButton sx={{ color: "#fff", mx: 1, position: "relative" }}>
                <Notifications />
                <Box
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#1DB954",
                  }}
                />
              </IconButton>
            </Tooltip>
            
            <Button
              variant="contained"
              size="small"
              component={Link}
              to="/login"
              startIcon={<Person />}
              sx={{
                ml: 1,
                bgcolor: "#1DB954",
                borderRadius: "20px",
                px: 2,
                boxShadow: "0 4px 20px rgba(29, 185, 84, 0.5)",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#18a84a",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(29, 185, 84, 0.6)",
                },
              }}
            >
              Log In
            </Button>
          </Box>
        </Box>

        {/* Hero Section */}
        <Box
          sx={{
            position: "relative",
            height: { xs: "80vh", md: "90vh" },
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Background Image with Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              "&:after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(to bottom, rgba(18,18,18,0.7) 0%, rgba(18,18,18,0.9) 100%)",
              },
              zIndex: 0,
              animation: animateHero ? "zoomIn 20s infinite alternate ease-in-out" : "none",
              "@keyframes zoomIn": {
                "0%": {
                  transform: "scale(1)",
                },
                "100%": {
                  transform: "scale(1.1)",
                },
              },
            }}
          />
          
          {/* Animated Particles */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: "hidden",
              zIndex: 1,
              opacity: 0.4,
            }}
          >
            {[...Array(20)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  width: Math.random() * 6 + 2,
                  height: Math.random() * 6 + 2,
                  backgroundColor: "#1DB954",
                  borderRadius: "50%",
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float-${i} ${Math.random() * 10 + 10}s infinite linear`,
                  [`@keyframes float-${i}`]: {
                    "0%": {
                      transform: "translate(0, 0)",
                      opacity: Math.random() * 0.5 + 0.3,
                    },
                    "25%": {
                      transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`,
                      opacity: Math.random() * 0.5 + 0.3,
                    },
                    "50%": {
                      transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`,
                      opacity: Math.random() * 0.5 + 0.3,
                    },
                    "75%": {
                      transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`,
                      opacity: Math.random() * 0.5 + 0.3,
                    },
                    "100%": {
                      transform: "translate(0, 0)",
                      opacity: Math.random() * 0.5 + 0.3,
                    },
                  },
                }}
              />
            ))}
          </Box>

          <Container
            maxWidth="xl"
            sx={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Fade in={animateHero} timeout={1000}>
              <Box sx={{ maxWidth: { xs: "100%", md: "50%" }, textAlign: { xs: "center", md: "left" } }}>
                <Typography
                  variant="h1"
                  component="h2"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                    color: "#fff",
                    mb: 2,
                    textShadow: "0 2px 10px rgba(0,0,0,0.3), 0 0 40px rgba(29, 185, 84, 0.2)",
                    lineHeight: 1.1,
                    position: "relative",
                    display: "inline-block",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -10,
                      left: { xs: "50%", md: 0 },
                      transform: { xs: "translateX(-50%)", md: "translateX(0)" },
                      width: 100,
                      height: 4,
                      borderRadius: 2,
                      background: "linear-gradient(90deg, #1DB954, transparent)",
                    },
                  }}
                >
                  Your Music, <br />
                  <Box 
                    component="span" 
                    sx={{ 
                      color: "#1DB954",
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        width: "120%",
                        height: "40%",
                        bottom: 0,
                        left: "-10%",
                        background: "rgba(29, 185, 84, 0.2)",
                        zIndex: -1,
                        transform: "rotate(-2deg)",
                      }
                    }}
                  >
                    Your Vibe
                  </Box>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    mb: 4,
                    maxWidth: "600px",
                    mx: { xs: "auto", md: 0 },
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    lineHeight: 1.6,
                  }}
                >
                  Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the
                  world.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrow />}
                    component={Link}
                    to="/signup"
                    sx={{
                      bgcolor: "#1DB954",
                      borderRadius: "30px",
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      boxShadow: "0 4px 20px rgba(29, 185, 84, 0.5)",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "all 0.5s ease",
                      },
                      "&:hover": {
                        bgcolor: "#18a84a",
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(29, 185, 84, 0.6)",
                        "&::before": {
                          left: "100%",
                        },
                      },
                      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    Start Listening Free
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/premium"
                    sx={{
                      color: "#fff",
                      borderColor: "rgba(255,255,255,0.5)",
                      borderRadius: "30px",
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(255,255,255,0.1)",
                        transform: "translateX(-100%) skewX(-15deg)",
                        transition: "transform 0.5s ease",
                      },
                      "&:hover": {
                        borderColor: "#fff",
                        transform: "translateY(-5px)",
                        "&::before": {
                          transform: "translateX(100%) skewX(-15deg)",
                        },
                      },
                      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    See Premium Plans
                  </Button>
                </Box>
              </Box>
            </Fade>

            {!isMobile && (
              <Slide direction="left" in={animateHero} timeout={1000}>
                <Box
                  sx={{
                    position: "relative",
                    width: "300px",
                    height: "450px",
                    display: { xs: "none", md: "block" },
                    transform: "rotate(-5deg)",
                    transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    "&:hover": {
                      transform: "rotate(-3deg) scale(1.05)",
                    },
                    perspective: "1000px",
                  }}
                >
                  <Paper
                    elevation={24}
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                      overflow: "hidden",
                      position: "relative",
                      bgcolor: "#181818",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(29, 185, 84, 0.2)",
                      transform: "rotateY(10deg)",
                      transition: "all 0.5s ease",
                      "&:hover": {
                        transform: "rotateY(0deg)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src="https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526"
                      alt="Album cover"
                      sx={{
                        width: "100%",
                        height: "65%",
                        objectFit: "cover",
                        filter: "brightness(1.1)",
                      }}
                    />
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        NOW PLAYING
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 0.5 }}>
                        Last Last
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Burna Boy
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <IconButton size="small" sx={{ color: "#aaa" }}>
                          <SkipPrevious />
                        </IconButton>
                        <IconButton
                          sx={{
                            color: "#fff",
                            bgcolor: "#1DB954",
                            "&:hover": { 
                              bgcolor: "#18a84a",
                              transform: "scale(1.1)",
                            },
                            transition: "all 0.2s ease",
                            boxShadow: "0 0 10px rgba(29, 185, 84, 0.5)",
                          }}
                        >
                          <PlayArrow />
                        </IconButton>
                        <IconButton size="small" sx={{ color: "#aaa" }}>
                          <SkipNext />
                        </IconButton>
                      </Box>

                      <Box
                        sx={{
                          mt: 2,
                          height: "4px",
                          bgcolor: "rgba(255,255,255,0.1)",
                          borderRadius: "2px",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: "100%",
                            width: "35%",
                            bgcolor: "#1DB954",
                            borderRadius: "2px",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              right: 0,
                              width: "10px",
                              height: "100%",
                              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3))",
                              animation: "pulse 1.5s infinite",
                              "@keyframes pulse": {
                                "0%": { opacity: 0.6 },
                                "50%": { opacity: 1 },
                                "100%": { opacity: 0.6 },
                              },
                            },
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 0.5,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          1:21
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          3:42
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                  
                  {/* Decorative elements */}
                  <Box
                    sx={{
                      position: "absolute",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #1DB954, transparent)",
                      top: -20,
                      right: -20,
                      opacity: 0.6,
                      filter: "blur(20px)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #1DB954, transparent)",
                      bottom: -30,
                      left: -30,
                      opacity: 0.4,
                      filter: "blur(30px)",
                    }}
                  />
                </Box>
              </Slide>
            )}
          </Container>
        </Box>

        {/* Featured Playlists Section */}
        <Container maxWidth="xl" sx={{ mt: 8, mb: 8, position: "relative", zIndex: 2 }}>
          <Fade in={animatePlaylists} timeout={1000}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  fontWeight: "bold", 
                  color: "#fff",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: 60,
                    height: 3,
                    borderRadius: 1.5,
                    background: "linear-gradient(90deg, #1DB954, transparent)",
                  },
                }}
              >
                Featured Playlists
              </Typography>

              <Button
                endIcon={<Explore />}
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "1px",
                    bgcolor: "#1DB954",
                    transform: "translateX(-100%)",
                    transition: "transform 0.3s ease",
                  },
                  "&:hover": { 
                    color: "#1DB954",
                    "&::before": {
                      transform: "translateX(0)",
                    },
                  },
                }}
              >
                See All
              </Button>
            </Box>
          </Fade>

          <Grid container spacing={3}>
            {featuredPlaylists.map((playlist, index) => (
              <Grid item xs={12} sm={6} md={4} key={playlist.id}>
                <Grow in={animatePlaylists} timeout={1000 + index * 200}>
                  <Paper
                    elevation={3}
                    sx={{
                      bgcolor: "#181818",
                      borderRadius: "12px",
                      overflow: "hidden",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "&:hover": {
                        transform: "translateY(-12px) scale(1.02)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(29, 185, 84, 0.2)",
                        "& .playButton": {
                          opacity: 1,
                          transform: "translateY(0) scale(1)",
                        },
                        "& .playlistImage": {
                          transform: "scale(1.1)",
                        },
                        "& .playlistOverlay": {
                          opacity: 1,
                        },
                      },
                      position: "relative",
                      cursor: "pointer",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    }}
                    onClick={() => playPlaylist(playlist)}
                    onMouseEnter={() => setHoveredPlaylist(playlist.id)}
                    onMouseLeave={() => setHoveredPlaylist(null)}
                  >
                    <Box sx={{ position: "relative", overflow: "hidden" }}>
                      <CardMedia 
                        component="img" 
                        height="220" 
                        image={playlist.image} 
                        alt={playlist.title}
                        className="playlistImage"
                        sx={{
                          transition: "transform 0.6s ease",
                        }}
                      />
                      <Box
                        className="playlistOverlay"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(to top, #181818 5%, transparent 50%, transparent)`,
                          opacity: 0,
                          transition: "opacity 0.4s ease",
                        }}
                      />
                      <Box
                        className="playButton"
                        sx={{
                          position: "absolute",
                          bottom: "20px",
                          right: "20px",
                          opacity: 0,
                          transform: "translateY(20px) scale(0.8)",
                          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                          zIndex: 2,
                        }}
                      >
                        <IconButton
                          sx={{
                            bgcolor: "#1DB954",
                            color: "#fff",
                            "&:hover": {
                              bgcolor: "#18a84a",
                              transform: "scale(1.1)",
                            },
                            boxShadow: "0 4px 15px rgba(29, 185, 84, 0.5)",
                            transition: "all 0.2s ease",
                            p: 2,
                          }}
                        >
                          <PlayArrow fontSize="large" />
                        </IconButton>
                      </Box>
                      
                      {/* Playlist badge */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          bgcolor: "rgba(0,0,0,0.6)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "20px",
                          px: 1.5,
                          py: 0.5,
                          display: "flex",
                          alignItems: "center",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        }}
                      >
                        <Typography variant="caption" sx={{ color: "#fff", fontWeight: "bold" }}>
                          {playlist.curator}
                        </Typography>
                      </Box>
                    </Box>

                    <CardContent sx={{ position: "relative" }}>
                      <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                          fontWeight: "bold", 
                          color: "#fff",
                          transition: "color 0.3s ease",
                          "&:hover": {
                            color: "#1DB954",
                          },
                        }}
                      >
                        {playlist.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: "rgba(255,255,255,0.7)",
                          mt: 1,
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          height: "40px",
                        }}
                      >
                        {playlist.description}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "rgba(255,255,255,0.7)",
                          }}
                        >
                          <Typography variant="body2" sx={{ mr: 2 }}>
                            {playlist.songs} songs
                          </Typography>
                          <Typography variant="body2">{playlist.followers} followers</Typography>
                        </Box>
                        
                        <Box sx={{ display: "flex" }}>
                          <Tooltip title="Add to library" arrow>
                            <IconButton 
                              size="small" 
                              sx={{ 
                                color: "rgba(255,255,255,0.7)",
                                "&:hover": {
                                  color: "#1DB954",
                                },
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          
                          <Tooltip title="More options" arrow>
                            <IconButton 
                              size="small" 
                              sx={{ 
                                color: "rgba(255,255,255,0.7)",
                                "&:hover": {
                                  color: "#1DB954",
                                },
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHoriz fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                      
                      {/* Playlist tracks preview (visible on hover) */}
                      {hoveredPlaylist === playlist.id && (
                        <Fade in={true} timeout={300}>
                          <Box
                            sx={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              right: 0,
                              bgcolor: "#181818",
                              borderBottomLeftRadius: "12px",
                              borderBottomRightRadius: "12px",
                              p: 2,
                              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                              zIndex: 10,
                            }}
                          >
                            <Typography variant="subtitle2" sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}>
                              Top tracks:
                            </Typography>
                            
                            {playlist.tracks.slice(0, 2).map((track, idx) => (
                              <Box
                                key={track.id}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  py: 1,
                                  borderBottom: idx < playlist.tracks.slice(0, 2).length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                                  "&:hover": {
                                    bgcolor: "rgba(255,255,255,0.05)",
                                  },
                                  borderRadius: "4px",
                                }}
                              >
                                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", width: 20 }}>
                                  {idx + 1}
                                </Typography>
                                <Box
                                  component="img"
                                  src={track.coverArt}
                                  alt={track.title}
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "4px",
                                    mx: 1,
                                  }}
                                />
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography 
                                    variant="body2" 
                                    sx={{ 
                                      color: "#fff", 
                                      fontWeight: "medium",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {track.title}
                                  </Typography>
                                  <Typography 
                                    variant="caption" 
                                    sx={{ 
                                      color: "rgba(255,255,255,0.7)",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {track.artist}
                                  </Typography>
                                </Box>
                                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", ml: 1 }}>
                                  {track.duration}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Fade>
                      )}
                    </CardContent>
                    
                    {/* Decorative gradient */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "5px",
                        background: playlist.color,
                      }}
                    />
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Why GrooveTunes Section */}
        <Box sx={{ bgcolor: "#181818", py: 8, position: "relative", overflow: "hidden" }}>
          {/* Background decorative elements */}
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "5%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(29, 185, 84, 0.1) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "10%",
              right: "5%",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(29, 185, 84, 0.1) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          
          <Container maxWidth="xl">
            <Fade in={animateFeatures} timeout={1000}>
              <Typography
                variant="h4"
                component="h2"
                align="center"
                gutterBottom
                sx={{ 
                  fontWeight: "bold", 
                  color: "#fff", 
                  mb: 6,
                  position: "relative",
                  display: "inline-block",
                  left: "50%",
                  transform: "translateX(-50%)",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 80,
                    height: 3,
                    borderRadius: 1.5,
                    background: "linear-gradient(90deg, transparent, #1DB954, transparent)",
                  },
                }}
              >
                Why Choose{" "}
                <Box component="span" sx={{ color: "#1DB954" }}>
                  GrooveTunes
                </Box>
                ?
              </Typography>
            </Fade>

            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Grow in={animateFeatures} timeout={1000}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 3,
                      height: "100%",
                      transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "&:hover": {
                        transform: "translateY(-12px)",
                        "& .featureIcon": {
                          transform: "rotateY(180deg)",
                          bgcolor: "rgba(29, 185, 84, 0.15)",
                        },
                      },
                      position: "relative",
                    }}
                  >
                    <Box
                      className="featureIcon"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(255,255,255,0.05)",
                        mb: 3,
                        transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1), inset 0 0 20px rgba(29, 185, 84, 0.2)",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: "50%",
                          border: "2px solid transparent",
                          borderTopColor: "#1DB954",
                          borderBottomColor: "#1DB954",
                          animation: "spin 8s linear infinite",
                          "@keyframes spin": {
                            "0%": {
                              transform: "rotate(0deg)",
                            },
                            "100%": {
                              transform: "rotate(360deg)",
                            },
                          },
                        },
                      }}
                    >
                      <Headphones sx={{ fontSize: 50, color: "#1DB954" }} />
                    </Box>

                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: "bold", 
                        color: "#fff", 
                        mb: 2,
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -8,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 40,
                          height: 2,
                          borderRadius: 1,
                          background: "linear-gradient(90deg, transparent, #1DB954, transparent)",
                        },
                      }}
                    >
                      Extensive Music Library
                    </Typography>

                    <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
                      Access millions of songs from various genres and artists worldwide. Discover new music or enjoy your
                      favorites with our vast collection that grows every day.
                    </Typography>
                    
                    {/* Decorative element */}
                    <Box
                      sx={{
                        position: "absolute",
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(29, 185, 84, 0.1) 0%, transparent 70%)",
                        top: 30,
                        left: "50%",
                        transform: "translateX(-50%)",
                        filter: "blur(20px)",
                        zIndex: -1,
                      }}
                    />
                  </Box>
                </Grow>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Grow in={animateFeatures} timeout={1200}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 3,
                      height: "100%",
                      transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "&:hover": {
                        transform: "translateY(-12px)",
                        "& .featureIcon": {
                          transform: "rotateY(180deg)",
                          bgcolor: "rgba(29, 185, 84, 0.15)",
                        },
                      },
                      position: "relative",
                    }}
                  >
                    <Box
                      className="featureIcon"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(255,255,255,0.05)",
                        mb: 3,
                        transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1), inset 0 0 20px rgba(29, 185, 84, 0.2)",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: "50%",
                          border: "2px solid transparent",
                          borderTopColor: "#1DB954",
                          borderBottomColor: "#1DB954",
                          animation: "spin 8s linear infinite",
                        },
                      }}
                    >
                      <PlaylistAdd sx={{ fontSize: 50, color: "#1DB954" }} />
                    </Box>

                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: "bold", 
                        color: "#fff", 
                        mb: 2,
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",\
                            {
                          content: '""',
                          position: "absolute",
                          bottom: -8,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 40,
                          height: 2,
                          borderRadius: 1,
                          background: "linear-gradient(90deg, transparent, #1DB954, transparent)",
                        },
                      }}
                    >
                      Personalized Playlists
                    </Typography>

                    <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
                      Create and customize playlists for every mood and occasion. Our AI also recommends playlists based on
                      your listening habits and preferences for a truly personalized experience.
                    </Typography>
                    
                    {/* Decorative element */}
                    <Box
                      sx={{
                        position: "absolute",
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(29, 185, 84, 0.1) 0%, transparent 70%)",
                        top: 30,
                        left: "50%",
                        transform: "translateX(-50%)",
                        filter: "blur(20px)",
                        zIndex: -1,
                      }}
                    />
                  </Box>
                </Grow>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Grow in={animateFeatures} timeout={1400}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 3,
                      height: "100%",
                      transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "&:hover": {
                        transform: "translateY(-12px)",
                        "& .featureIcon": {
                          transform: "rotateY(180deg)",
                          bgcolor: "rgba(29, 185, 84, 0.15)",
                        },
                      },
                      position: "relative",
                    }}
                  >
                    <Box
                      className="featureIcon"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(255,255,255,0.05)",
                        mb: 3,
                        transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1), inset 0 0 20px rgba(29, 185, 84, 0.2)",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: "50%",
                          border: "2px solid transparent",
                          borderTopColor: "#1DB954",
                          borderBottomColor: "#1DB954",
                          animation: "spin 8s linear infinite",
                        },
                      }}
                    >
                      <Equalizer sx={{ fontSize: 50, color: "#1DB954" }} />
                    </Box>

                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: "bold", 
                        color: "#fff", 
                        mb: 2,
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -8,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 40,
                          height: 2,
                          borderRadius: 1,
                          background: "linear-gradient(90deg, transparent, #1DB954, transparent)",
                        },
                      }}
                    >
                      High-Quality Audio
                    </Typography>

                    <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
                      Experience crystal-clear sound with our premium audio quality. Enjoy music the way artists intended it
                      to be heard with advanced audio processing and lossless streaming options.
                    </Typography>
                    
                    {/* Decorative element */}
                    <Box
                      sx={{
                        position: "absolute",
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(29, 185, 84, 0.1) 0%, transparent 70%)",
                        top: 30,
                        left: "50%",
                        transform: "translateX(-50%)",
                        filter: "blur(20px)",
                        zIndex: -1,
                      }}
                    />
                  </Box>
                </Grow>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Top Trending Afrobeats Artists Section */}
        <Container maxWidth="xl" sx={{ mt: 8, mb: 8, position: "relative", zIndex: 2 }}>
          <Fade in={animateArtists} timeout={1000}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  fontWeight: "bold", 
                  color: "#fff",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: 60,
                    height: 3,
                    borderRadius: 1.5,
                    background: "linear-gradient(90deg, #1DB954, transparent)",
                  },
                }}
              >
                Top Trending Afrobeats Artists
              </Typography>

              <Chip
                icon={<TrendingUp sx={{ color: "#1DB954 !important" }} />}
                label="Hot Now"
                sx={{
                  bgcolor: "rgba(29, 185, 84, 0.15)",
                  color: "#1DB954",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  px: 1,
                  boxShadow: "0 0 10px rgba(29, 185, 84, 0.3)",
                }}
              />
            </Box>
          </Fade>

          <Grid container spacing={3}>
            {artists.map((artist, index) => (
              <Grid item xs={12} sm={6} md={4} key={artist.id}>
                <Grow in={animateArtists} timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      bgcolor: "#181818",
                      borderRadius: "12px",
                      overflow: "hidden",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "&:hover": {
                        transform: "translateY(-12px) scale(1.02)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(29, 185, 84, 0.2)",
                        "& .artistOverlay": {
                          opacity: 1,
                        },
                        "& .artistImage": {
                          transform: "scale(1.1)",
                        },
                      },
                      cursor: "pointer",
                      position: "relative",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    }}
                    onClick={() => playArtist(artist)}
                    onMouseEnter={() => setHoveredArtist(artist.id)}
                    onMouseLeave={() => setHoveredArtist(null)}
                  >
                    <Box sx={{ position: "relative", overflow: "hidden" }}>
                      <CardMedia
                        component="img"
                        height="320"
                        image={artist.image}
                        alt={artist.name}
                        className="artistImage"
                        sx={{
                          transition: "transform 0.6s ease",
                        }}
                      />
                      <Box
                        className="artistOverlay"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.4s ease",
                        }}
                      >
                        <Button
                          variant="contained"
                          startIcon={<PlayArrow />}
                          sx={{
                            bgcolor: "#1DB954",
                            borderRadius: "30px",
                            px: 3,
                            py: 1.2,
                            boxShadow: "0 4px 20px rgba(29, 185, 84, 0.5)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: "#18a84a",
                              transform: "scale(1.05)",
                              boxShadow: "0 6px 25px rgba(29, 185, 84, 0.6)",
                            },
                          }}
                        >
                          Play
                        </Button>
                      </Box>
                      
                      {/* Verified badge */}
                      {artist.verified && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            bgcolor: "rgba(0,0,0,0.6)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "20px",
                            px: 1.5,
                            py: 0.5,
                            display: "flex",
                            alignItems: "center",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: "#1DB954",
                              mr: 1,
                            }}
                          />
                          <Typography variant="caption" sx={{ color: "#fff", fontWeight: "bold" }}>
                            Verified
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <CardContent sx={{ position: "relative" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography 
                            gutterBottom 
                            variant="h5" 
                            component="div" 
                            sx={{ 
                              fontWeight: "bold", 
                              color: "#fff",
                              transition: "color 0.3s ease",
                              "&:hover": {
                                color: "#1DB954",
                              },
                            }}
                          >
                            {artist.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                            {artist.description}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconButton 
                            sx={{ 
                              color: likedArtists[artist.id] ? "#1DB954" : "rgba(255,255,255,0.7)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.1)",
                              },
                            }}
                            onClick={(e) => toggleLike(artist.id, e)}
                          >
                            {likedArtists[artist.id] ? <Favorite /> : <FavoriteBorder />}
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 1,
                          mb: 2,
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mr: 2 }}>
                          {artist.monthlyListeners} monthly listeners
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            bgcolor: "rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            px: 1,
                            py: 0.2,
                          }}
                        >
                          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
                            Top city: {artist.topCity}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          mt: 2,
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {artist.genres.map((genre, index) => (
                          <Chip
                            key={index}
                            label={genre}
                            size="small"
                            sx={{
                              bgcolor: "rgba(255,255,255,0.1)",
                              color: "rgba(255,255,255,0.7)",
                              borderRadius: "12px",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                bgcolor: "rgba(29, 185, 84, 0.2)",
                                color: "#1DB954",
                              },
                            }}
                          />
                        ))}
                      </Box>
                      
                      {/* Artist actions */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 2,
                          pt: 2,
                          borderTop: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <Button
                          size="small"
                          startIcon={<Share fontSize="small" />}
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            "&:hover": {
                              color: "#1DB954",
                            },
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Share
                        </Button>
                        
                        <Button
                          size="small"
                          startIcon={<MoreHoriz fontSize="small" />}
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            "&:hover": {
                              color: "#1DB954",
                            },
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          More
                        </Button>
                      </Box>
                      
                      {/* Artist tracks preview (visible on hover) */}
                      {hoveredArtist === artist.id && (
                        <Fade in={true} timeout={300}>
                          <Box
                            sx={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              right: 0,
                              bgcolor: "#181818",
                              borderBottomLeftRadius: "12px",
                              borderBottomRightRadius: "12px",
                              p: 2,
                              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                              zIndex: 10,
                            }}
                          >
                            <Typography variant="subtitle2" sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}>
                              Popular track:
                            </Typography>
                            
                            {artist.tracks.slice(0, 1).map((track) => (
                              <Box
                                key={track.id}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  py: 1,
                                  "&:hover": {
                                    bgcolor: "rgba(255,255,255,0.05)",
                                  },
                                  borderRadius: "4px",
                                }}
                              >
                                <IconButton 
                                  size="small" 
                                  sx={{ 
                                    color: "#1DB954",
                                    mr: 1,
                                  }}
                                >
                                  <PlayArrow fontSize="small" />
                                </IconButton>
                                <Box
                                  component="img"
                                  src={track.coverArt}
                                  alt={track.title}
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "4px",
                                    mx: 1,
                                  }}
                                />
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography 
                                    variant="body2" 
                                    sx={{ 
                                      color: "#fff", 
                                      fontWeight: "medium",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {track.title}
                                  </Typography>
                                  <Typography 
                                    variant="caption" 
                                    sx={{ 
                                      color: "rgba(255,255,255,0.7)",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {track.artist}
                                  </Typography>
                                </Box>
                                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", ml: 1 }}>
                                  {track.duration}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Fade>
                      )}
                    </CardContent>
                    
                    {/* Decorative gradient */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "5px",
                        background: artist.color,
                      }}
                    />
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Call to Action */}
        <Box
          sx={{
            bgcolor: "#1DB954",
            py: 8,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Pattern */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage:
                "radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)",
              backgroundSize: "100px 100px",
              animation: "moveBackground 60s linear infinite",
              "@keyframes moveBackground": {
                "0%": {
                  backgroundPosition: "0 0",
                },
                "100%": {
                  backgroundPosition: "100px 100px",
                },
              },
            }}
          />
          
          {/* Animated particles */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: "hidden",
            }}
          >
            {[...Array(15)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  width: Math.random() * 8 + 4,
                  height: Math.random() * 8 + 4,
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                  animation: `floatCTA-${i} ${Math.random() * 10 + 15}s infinite linear`,
                  "@keyframes floatCTA-" + i: {
                    "0%": {
                      transform: "translate(0, 0)",
                    },
                    "25%": {
                      transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`,
                    },
                    "50%": {
                      transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`,
                    },
                    "75%": {
                      transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`,
                    },
                    "100%": {
                      transform: "translate(0, 0)",
                    },
                  },
                }}
              />
            ))}
          </Box>

          <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                textAlign: "center",
                color: "#fff",
              }}
            >
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: "bold", 
                  mb: 3,
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                Ready to Start Grooving?
              </Typography>

              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  maxWidth: "700px",
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                Join millions of music lovers and discover your next favorite song today. 
                Unlimited music, personalized playlists, and premium sound quality await you.
              </Typography>

              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/signup"
                sx={{
                  bgcolor: "#fff",
                  color: "#1DB954",
                  borderRadius: "30px",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    transition: "all 0.5s ease",
                  },
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                    "&::before": {
                      left: "100%",
                    },
                  },
                  transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              >
                Get Started Free
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ bgcolor: "#121212", borderTop: "1px solid rgba(255,255,255,0.1)", py: 6 }}>
          <Container maxWidth="xl">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <MusicNote sx={{ color: "#1DB954", fontSize: 32, mr: 1 }} />
                  <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", color: "#1DB954" }}>
                    GrooveTunes
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}>
                  GrooveTunes is your ultimate music streaming platform. Discover, listen, and share music from around the
                  world with our cutting-edge audio technology and vast music library.
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: "#fff",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        color: "#1DB954",
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.15)",
                        },
                      }}
                    >
                      <i className="fab fa-facebook-f"></i>
                    </Box>
                  </IconButton>

                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: "#fff",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        color: "#1DB954",
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.15)",
                        },
                      }}
                    >
                      <i className="fab fa-twitter"></i>
                    </Box>
                  </IconButton>

                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: "#fff",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        color: "#1DB954",
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.15)",
                        },
                      }}
                    >
                      <i className="fab fa-instagram"></i>
                    </Box>
                  </IconButton>
                </Box>
              </Grid>

              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>
                  Company
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    p: 0,
                    m: 0,
                  }}
                >
                  <Box component="li" sx={{ mb: 1 }}>
                    <Button
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        p: 0,
                        textTransform: "none",
                        justifyContent: "flex-start",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "0%",
                          height: "1px",
                          bgcolor: "#1DB954",
                          transition: "width 0.3s ease",
                        },
                        "&:hover": { 
                          color: "#1DB954",
                          "&::before": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      About
                    </Button>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Button
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        p: 0,
                        textTransform: "none",
                        justifyContent: "flex-start",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "0%",
                          height: "1px",
                          bgcolor: "#1DB954",
                          transition: "width 0.3s ease",
                        },
                        "&:hover": { 
                          color: "#1DB954",
                          "&::before": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      Jobs
                    </Button>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Button
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        p: 0,
                        textTransform: "none",
                        justifyContent: "flex-start",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "0%",
                          height: "1px",
                          bgcolor: "#1DB954",
                          transition: "width 0.3s ease",
                        },
                        "&:hover": { 
                          color: "#1DB954",
                          "&::before": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      For the Record
                    </Button>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>
                  Communities
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    p: 0,
                    m: 0,
                  }}
                >
                  <Box component="li" sx={{ mb: 1 }}>
                    <Button
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        p: 0,
                        textTransform: "none",
                        justifyContent: "flex-start",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "0%",
                          height: "1px",
                          bgcolor: "#1DB954",
                          transition: "width 0.3s ease",
                        },
                        "&:hover": { 
                          color: "#1DB954",
                          "&::before": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      For Artists
                    </Button>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Button
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        p: 0,
                        textTransform: "none",
                        justifyContent: "flex-start",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "0%",
                          height: "1px",
                          bgcolor: "#1DB954",
                          transition: "width 0.3s ease",
                        },
                        "&:hover": { 
                          color: "#1DB954",
                          "&::before": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      Developers
                    </Button>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Button
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        p: 0,
                        textTransform: "none",
                        justifyContent: "flex-start",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "0%",
                          height: "1px",
                          bgcolor: "#1DB954",
                          transition: "width 0.3s ease",
                        },
                        "&:hover": { 
                          color: "#1DB954",
                          "&::before": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      Advertising
                    </Button>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>
                  Useful Links
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    p: 0,
                    m: 0,
                  }}
                >
                  <Box component="li" sx={{ mb: 1 }}>
                    <Button
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        p: 0,
                        textTransform: "none",
                        justifyContent: "flex-start",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "0%",
                          height: "1px",
                          bgcolor: "#1DB954",
                          transition: "width 0.3s ease",
                        },
                        "&:hover": { 
                          color: "#1DB954",
                          "&::before": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      Support
                    </Button>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Button
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        p: 0,
                        textTransform: "none",
                        justifyContent: "flex-start",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "0%",
                          height: "1px",
                          bgcolor: "#1DB954",
                          transition: "width 0.3s ease",
                        },
                        "&:hover": { 
                          color: "#1DB954",
                          "&::before": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      Web Player
                    </Button>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Button
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        p: 0,
                        textTransform: "none",
                        justifyContent: "flex-start",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "0%",
                          height: "1px",
                          bgcolor: "#1DB954",
                          transition: "width 0.3s ease",
                        },
                        "&:hover": { 
                          color: "#1DB954",
                          "&::before": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      Mobile App
                    </Button>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>
                  Legal
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    p: 0,
                    m: 0,
                  }}
                >
                  <Box component="li" sx={{ mb: 1 }}>
                    <Button
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        p: 0,
                        textTransform: "none",
                        justifyContent: "flex-start",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "0%",
                          height: "1px",
                          bgcolor: "#1DB954",
                          transition: "width 0.3s ease",
                        },
                        "&:hover": { 
                          color: "#1DB954",
                          "&::before": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      Privacy Policy
                    </Button>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Button
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        p: 0,
                        textTransform: "none",
                        justifyContent: "flex-start",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "0%",
                          height: "1px",
                          bgcolor: "#1DB954",
                          transition: "width 0.3s ease",
                        },
                        "&:hover": { 
                          color: "#1DB954",
                          "&::before": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      Terms of Use
                    </Button>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Button
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        p: 0,
                        textTransform: "none",
                        justifyContent: "flex-start",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "0%",
                          height: "1px",
                          bgcolor: "#1DB954",
                          transition: "width 0.3s ease",
                        },
                        "&:hover": { 
                          color: "#1DB954",
                          "&::before": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      Cookies
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "center", sm: "flex-start" },
              }}
            >
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                © 2025 GrooveTunes. All rights reserved.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: { xs: 2, sm: 0 },
                }}
              >
                <Button
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "none",
                    fontSize: "0.75rem",
                    "&:hover": { color: "#1DB954" },
                  }}
                >
                  Privacy Center
                </Button>
                <Button
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "none",
                    fontSize: "0.75rem",
                    "&:hover": { color: "#1DB954" },
                  }}
                >
                  Cookies
                </Button>
                <Button
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "none",
                    fontSize: "0.75rem",
                    "&:hover": { color: "#1DB954" },
                  }}
                >
                  About Ads
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(5px)",
            zIndex: 1100,
            display: { xs: "block", lg: "none" },
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Custom Audio Player Integration */}
      {isPlayerVisible && currentTrack && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            bgcolor: "rgba(18,18,18,0.95)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            p: isPlayerMinimized ? 1 : 2,
            transition: "all 0.3s ease",
            boxShadow: "0 -5px 20px rgba(0,0,0,0.5)",
            height: isPlayerMinimized ? "60px" : "auto",
            overflow: "hidden",
          }}
        >
          {isPlayerMinimized ? (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                <Box
                  component="img"
                  src={currentTrack.coverArt}
                  alt={currentTrack.title}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    mr: 2,
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ minWidth: 0 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      color: "#fff", 
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {currentTrack.title}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: "rgba(255,255,255,0.7)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {currentTrack.artist}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton 
                  sx={{ 
                    color: "#1DB954",
                    mx: 1,
                  }}
                >
                  <PlayArrow />
                </IconButton>
                
                <IconButton
                  onClick={togglePlayerMinimize}
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  <SkipNext sx={{ transform: "rotate(-90deg)" }} />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                <Box
                  component="img"
                  src={currentTrack.coverArt}
                  alt={currentTrack.title}
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 1,
                    mr: 2,
                    objectFit: "cover",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: "bold" }}>
                    {currentTrack.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                    {currentTrack.artist}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flex: 2 }}>
                <CustomAudioPlayer
                  audioSrc={currentTrack.audioSrc}
                  title={currentTrack.title}
                  artist={currentTrack.artist}
                  coverArt={currentTrack.coverArt}
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={togglePlayerMinimize}
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "#fff" },
                    mr: 1,
                  }}
                >
                  <SkipNext sx={{ transform: "rotate(90deg)" }} />
                </IconButton>
                
                <IconButton
                  onClick={closePlayer}
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  <Close />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default Home
