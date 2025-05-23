"use client"
import { useState } from "react"
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
} from "@mui/icons-material"
import SpotifyPlayer from "../components/SpotifyPlayer" // Updated import

const Home = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isMedium = useMediaQuery(theme.breakpoints.down("md"))

  // State for the currently playing track and playlist
  const [currentSpotifyLink, setCurrentSpotifyLink] = useState("")
  const [songInfo, setSongInfo] = useState(null)
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)
  const [likedArtists, setLikedArtists] = useState({})
  const [currentPlaylist, setCurrentPlaylist] = useState(null)

  // Featured playlists data with Spotify links
  const featuredPlaylists = [
    {
      id: 1,
      title: "Afrobeats Essentials",
      image: "https://i.scdn.co/image/ab67706f00000003b70e0223f544b1faa2e95ed0",
      songs: 42,
      followers: "2.3M",
      spotifyLink: "https://open.spotify.com/playlist/37i9dQZF1DWYs83FtTMQFw",
      description: "The essential tracks from the Afrobeats scene. Cover: Burna Boy",
    },
    {
      id: 2,
      title: "Chill Vibes",
      image: "https://i.scdn.co/image/ab67706f00000003e8e28219724c2423afa4d320",
      songs: 35,
      followers: "1.8M",
      spotifyLink: "https://open.spotify.com/playlist/37i9dQZF1DX889U0CL85jj",
      description: "Chill R&B and alternative vibes for relaxation and good times.",
    },
    {
      id: 3,
      title: "Workout Beats",
      image: "https://i.scdn.co/image/ab67706f000000034d26d431869cabfc53c67d8e",
      songs: 50,
      followers: "3.1M",
      spotifyLink: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP",
      description: "Up-tempo tracks to power your workout and keep you motivated.",
    },
  ]

  // Artist data with Spotify links
  const artists = [
    {
      id: 1,
      name: "Davido",
      image: "https://media.premiumtimesng.com/wp-content/files/2023/07/Davido.png",
      description: "Nigerian singer & producer",
      followers: "4.2M",
      genres: ["Afrobeats", "Pop", "R&B"],
      spotifyLink: "https://open.spotify.com/artist/0Y3agQaa6g2r0YmHPOO9rh",
    },
    {
      id: 2,
      name: "Wizkid",
      image: "https://i.scdn.co/image/ab6761610000e5eb9050b61368975fda051cdc06",
      description: "Nigerian singer & songwriter",
      followers: "5.8M",
      genres: ["Afrobeats", "Afrofusion", "R&B"],
      spotifyLink: "https://open.spotify.com/artist/3tVQdUvClmAT7URs9V3rsp",
    },
    {
      id: 3,
      name: "Burna Boy",
      image: "https://dailytrust.com/wp-content/uploads/2023/04/Burna-Boy-scaled-1.jpg",
      description: "Nigerian singer & performer",
      followers: "6.1M",
      genres: ["Afrobeats", "Dancehall", "Reggae"],
      spotifyLink: "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa",
    },
  ]

  // Toggle like for an artist
  const toggleLike = (artistId, event) => {
    event.stopPropagation()
    setLikedArtists((prev) => ({
      ...prev,
      [artistId]: !prev[artistId],
    }))
  }

  // Function to play a playlist
  const playPlaylist = (playlist) => {
    console.log("Playing playlist:", playlist.title, "with Spotify link:", playlist.spotifyLink)

    setCurrentSpotifyLink(playlist.spotifyLink)
    setSongInfo({
      title: playlist.title,
      artist: playlist.description,
      albumArt: playlist.image,
    })
    setIsPlayerVisible(true)
    setCurrentPlaylist(playlist)
  }

  // Function to play an artist
  const playArtist = (artist) => {
    console.log("Playing artist:", artist.name, "with Spotify link:", artist.spotifyLink)

    setCurrentSpotifyLink(artist.spotifyLink)
    setSongInfo({
      title: artist.name,
      artist: artist.description,
      albumArt: artist.image,
    })
    setIsPlayerVisible(true)
  }

  // Function to close the player
  const closePlayer = () => {
    setIsPlayerVisible(false)
    setCurrentSpotifyLink("")
    setSongInfo(null)
    setCurrentPlaylist(null)
  }

  // For testing - play a sample Spotify playlist
  const playTestSpotify = () => {
    // Use a popular Spotify playlist
    const testPlaylist = {
      title: "Today's Top Hits",
      description: "Spotify's most popular playlist",
      image: "https://i.scdn.co/image/ab67706f00000003c03f6a4c30d5178f973e3f0c",
      spotifyLink: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
    }

    playPlaylist(testPlaylist)
  }

  return (
    <Box sx={{ bgcolor: "#121212", color: "#fff", minHeight: "100vh" }}>
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
          backdropFilter: "blur(10px)",
          bgcolor: "rgba(18,18,18,0.8)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MusicNote sx={{ color: "#1DB954", fontSize: 32, mr: 1 }} />
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", color: "#1DB954" }}>
            GrooveTunes
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              mr: 2,
            }}
          >
            <Button
              sx={{
                color: "#fff",
                mx: 1,
                "&:hover": { color: "#1DB954" },
              }}
            >
              Discover
            </Button>
            <Button
              sx={{
                color: "#fff",
                mx: 1,
                "&:hover": { color: "#1DB954" },
              }}
            >
              Library
            </Button>
            <Button
              sx={{
                color: "#fff",
                mx: 1,
                "&:hover": { color: "#1DB954" },
              }}
              onClick={playTestSpotify} // Test Spotify button
            >
              Test Spotify
            </Button>
          </Box>

          <IconButton sx={{ color: "#fff" }}>
            <Search />
          </IconButton>

          <Button
            variant="contained"
            size="small"
            component={Link}
            to="/login"
            sx={{
              ml: 2,
              bgcolor: "#1DB954",
              borderRadius: "20px",
              px: 2,
              "&:hover": {
                bgcolor: "#18a84a",
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
          height: { xs: "70vh", md: "80vh" },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          mb: isPlayerVisible ? "120px" : 0, // Add margin at bottom if player is visible
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
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ maxWidth: { xs: "100%", md: "50%" }, textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h1"
              component="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                color: "#fff",
                mb: 2,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                lineHeight: 1.1,
              }}
            >
              Your Music, <br />
              <Box component="span" sx={{ color: "#1DB954" }}>
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
                onClick={playTestSpotify} // Test Spotify button
                sx={{
                  bgcolor: "#1DB954",
                  borderRadius: "30px",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#18a84a",
                    transform: "scale(1.05)",
                    transition: "all 0.3s",
                  },
                }}
              >
                Play Top Hits
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
                  "&:hover": {
                    borderColor: "#fff",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                See Premium Plans
              </Button>
            </Box>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                position: "relative",
                width: "300px",
                height: "450px",
                display: { xs: "none", md: "block" },
                transform: "rotate(-5deg)",
                transition: "all 0.5s ease",
                "&:hover": {
                  transform: "rotate(-3deg) scale(1.05)",
                },
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
                        "&:hover": { bgcolor: "#18a84a" },
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
            </Box>
          )}
        </Container>
      </Box>

      {/* Featured Playlists Section */}
      <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", color: "#fff" }}>
            Featured Playlists
          </Typography>

          <Button
            endIcon={<Explore />}
            sx={{
              color: "rgba(255,255,255,0.7)",
              "&:hover": { color: "#1DB954" },
            }}
          >
            See All
          </Button>
        </Box>

        <Grid container spacing={3}>
          {featuredPlaylists.map((playlist) => (
            <Grid item xs={12} sm={6} md={4} key={playlist.id}>
              <Paper
                elevation={3}
                sx={{
                  bgcolor: "#181818",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 16px 30px rgba(0,0,0,0.3)",
                    "& .playButton": {
                      opacity: 1,
                      transform: "translateY(0) scale(1)",
                    },
                  },
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => playPlaylist(playlist)}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia component="img" height="220" image={playlist.image} alt={playlist.title} />
                  <Box
                    className="playButton"
                    sx={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      opacity: 0,
                      transform: "translateY(20px) scale(0.8)",
                      transition: "all 0.3s ease",
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
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                      }}
                    >
                      <PlayArrow fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>

                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#fff" }}>
                    {playlist.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}>
                    {playlist.description}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 1,
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      {playlist.songs} songs
                    </Typography>
                    <Typography variant="body2">{playlist.followers} followers</Typography>
                  </Box>
                </CardContent>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why GrooveTunes Section */}
      <Box sx={{ bgcolor: "#181818", py: 8 }}>
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#fff", mb: 6 }}
          >
            Why Choose{" "}
            <Box component="span" sx={{ color: "#1DB954" }}>
              GrooveTunes
            </Box>
            ?
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  p: 3,
                  height: "100%",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    "& .featureIcon": {
                      transform: "scale(1.1)",
                      bgcolor: "rgba(29, 185, 84, 0.15)",
                    },
                  },
                }}
              >
                <Box
                  className="featureIcon"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(255,255,255,0.05)",
                    mb: 3,
                    transition: "all 0.3s ease",
                  }}
                >
                  <Headphones sx={{ fontSize: 40, color: "#1DB954" }} />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>
                  Extensive Music Library
                </Typography>

                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  Access millions of songs from various genres and artists worldwide. Discover new music or enjoy your
                  favorites with our vast collection.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  p: 3,
                  height: "100%",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    "& .featureIcon": {
                      transform: "scale(1.1)",
                      bgcolor: "rgba(29, 185, 84, 0.15)",
                    },
                  },
                }}
              >
                <Box
                  className="featureIcon"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(255,255,255,0.05)",
                    mb: 3,
                    transition: "all 0.3s ease",
                  }}
                >
                  <PlaylistAdd sx={{ fontSize: 40, color: "#1DB954" }} />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>
                  Personalized Playlists
                </Typography>

                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  Create and customize playlists for every mood and occasion. Our AI also recommends playlists based on
                  your listening habits.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  p: 3,
                  height: "100%",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    "& .featureIcon": {
                      transform: "scale(1.1)",
                      bgcolor: "rgba(29, 185, 84, 0.15)",
                    },
                  },
                }}
              >
                <Box
                  className="featureIcon"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(255,255,255,0.05)",
                    mb: 3,
                    transition: "all 0.3s ease",
                  }}
                >
                  <Equalizer sx={{ fontSize: 40, color: "#1DB954" }} />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>
                  High-Quality Audio
                </Typography>

                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  Experience crystal-clear sound with our premium audio quality. Enjoy music the way artists intended it
                  to be heard.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Top Trending Afrobeats Artists Section */}
      <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", color: "#fff" }}>
            Top Trending Afrobeats Artists
          </Typography>

          <Chip
            icon={<TrendingUp sx={{ color: "#1DB954 !important" }} />}
            label="Hot Now"
            sx={{
              bgcolor: "rgba(29, 185, 84, 0.15)",
              color: "#1DB954",
              fontWeight: "bold",
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {artists.map((artist) => (
            <Grid item xs={12} sm={6} md={4} key={artist.id}>
              <Card
                sx={{
                  bgcolor: "#181818",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 16px 30px rgba(0,0,0,0.3)",
                    "& .artistOverlay": {
                      opacity: 1,
                    },
                    "& .artistImage": {
                      transform: "scale(1.05)",
                    },
                  },
                  cursor: "pointer",
                }}
                onClick={() => playArtist(artist)}
              >
                <Box sx={{ position: "relative", overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    height="320"
                    image={artist.image}
                    alt={artist.name}
                    className="artistImage"
                    sx={{
                      transition: "transform 0.5s ease",
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
                      bgcolor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      sx={{
                        bgcolor: "#1DB954",
                        borderRadius: "30px",
                        px: 3,
                        "&:hover": {
                          bgcolor: "#18a84a",
                        },
                      }}
                    >
                      Play
                    </Button>
                  </Box>
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
                      <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold", color: "#fff" }}>
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
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      <IconButton
                        sx={{
                          color: likedArtists[artist.id] ? "#1DB954" : "rgba(255,255,255,0.7)",
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
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
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
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              textAlign: "center",
              color: "#fff",
            }}
          >
            <Typography variant="h3" component="h2" sx={{ fontWeight: "bold", mb: 3 }}>
              Ready to Start Grooving?
            </Typography>

            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join millions of music lovers and discover your next favorite song today.
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
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                  transform: "scale(1.05)",
                  transition: "all 0.3s",
                },
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
                world.
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton size="small" sx={{ color: "#fff" }}>
                  <Box
                    component="span"
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </Box>
                </IconButton>

                <IconButton size="small" sx={{ color: "#fff" }}>
                  <Box
                    component="span"
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className="fab fa-twitter"></i>
                  </Box>
                </IconButton>

                <IconButton size="small" sx={{ color: "#fff" }}>
                  <Box
                    component="span"
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                      "&:hover": { color: "#1DB954" },
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
                      "&:hover": { color: "#1DB954" },
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
                      "&:hover": { color: "#1DB954" },
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
                      "&:hover": { color: "#1DB954" },
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
                      "&:hover": { color: "#1DB954" },
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
                      "&:hover": { color: "#1DB954" },
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
                      "&:hover": { color: "#1DB954" },
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
                      "&:hover": { color: "#1DB954" },
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
                      "&:hover": { color: "#1DB954" },
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
                      "&:hover": { color: "#1DB954" },
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
                      "&:hover": { color: "#1DB954" },
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
                      "&:hover": { color: "#1DB954" },
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

      {/* Spotify Player Integration */}
      {isPlayerVisible && currentSpotifyLink && songInfo && (
        <SpotifyPlayer
          spotifyLink={currentSpotifyLink}
          title={songInfo.title}
          artist={songInfo.artist}
          coverArt={songInfo.albumArt}
          onClose={closePlayer}
        />
      )}
    </Box>
  )
}

export default Home
