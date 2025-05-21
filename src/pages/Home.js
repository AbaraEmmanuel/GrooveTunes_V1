"use client"
import { useState } from "react"
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
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
  Equalizer,
  Explore,
  TrendingUp,
  Close,
  Person,
} from "@mui/icons-material"
import CustomAudioPlayer from "./CustomAudioPlayer" // Import your custom audio player

const Home = () => {
  // State for the currently playing track
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)
  const [likedArtists, setLikedArtists] = useState({})

  // Featured playlists data with audio tracks
  const featuredPlaylists = [
    {
      id: 1,
      title: "Afrobeats Essentials",
      image: "https://i.scdn.co/image/ab67706f00000003b70e0223f544b1faa2e95ed0",
      songs: 42,
      followers: "2.3M",
      tracks: [
        {
          id: "track1",
          title: "Last Last",
          artist: "Burna Boy",
          audioSrc: "/audio/last-last.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
        },
      ],
    },
    {
      id: 2,
      title: "Chill Vibes",
      image: "https://i.scdn.co/image/ab67706f00000003e8e28219724c2423afa4d320",
      songs: 35,
      followers: "1.8M",
      tracks: [
        {
          id: "track3",
          title: "Calm Down",
          artist: "Rema",
          audioSrc: "/audio/calm-down.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273f29d0c86f34e5d062a5c41e3",
        },
      ],
    },
    {
      id: 3,
      title: "Workout Beats",
      image: "https://i.scdn.co/image/ab67706f000000034d26d431869cabfc53c67d8e",
      songs: 50,
      followers: "3.1M",
      tracks: [
        {
          id: "track5",
          title: "Sungba (Remix)",
          artist: "Asake ft. Burna Boy",
          audioSrc: "/audio/sungba.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273b5a0c2f8da6f6e7f3ebd8336",
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
      genres: ["Afrobeats", "Pop", "R&B"],
      tracks: [
        {
          id: "track7",
          title: "Unavailable",
          artist: "Davido ft. Musa Keys",
          audioSrc: "/audio/unavailable.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273c5e2f328b0efb49b09bd22fd",
        },
      ],
    },
    {
      id: 2,
      name: "Wizkid",
      image: "https://i.scdn.co/image/ab6761610000e5eb9050b61368975fda051cdc06",
      description: "Nigerian singer & songwriter",
      followers: "5.8M",
      genres: ["Afrobeats", "Afrofusion", "R&B"],
      tracks: [
        {
          id: "track8",
          title: "Essence",
          artist: "Wizkid ft. Tems",
          audioSrc: "/audio/essence.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273c5e2f328b0efb49b09bd22fd",
        },
      ],
    },
    {
      id: 3,
      name: "Burna Boy",
      image: "https://dailytrust.com/wp-content/uploads/2023/04/Burna-Boy-scaled-1.jpg",
      description: "Nigerian singer & performer",
      followers: "6.1M",
      genres: ["Afrobeats", "Dancehall", "Reggae"],
      tracks: [
        {
          id: "track9",
          title: "Last Last",
          artist: "Burna Boy",
          audioSrc: "/audio/last-last.mp3", // Replace with your actual audio path
          coverArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
        },
      ],
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

  // Function to play a track from a playlist
  const playPlaylist = (playlist) => {
    if (playlist.tracks && playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0])
      setIsPlayerVisible(true)
    }
  }

  // Function to play a track from an artist
  const playArtist = (artist) => {
    if (artist.tracks && artist.tracks.length > 0) {
      setCurrentTrack(artist.tracks[0])
      setIsPlayerVisible(true)
    }
  }

  // Function to close the player
  const closePlayer = () => {
    setIsPlayerVisible(false)
    setCurrentTrack(null)
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 sticky top-0 z-10 bg-gray-900">
        <div className="flex items-center">
          <MusicNote style={{ color: "#1DB954", fontSize: 32, marginRight: 8 }} />
          <Typography variant="h5" component="h1" style={{ fontWeight: "bold", color: "#1DB954" }}>
            GrooveTunes
          </Typography>
        </div>

        <div className="flex items-center">
          <IconButton style={{ color: "#fff" }}>
            <Search />
          </IconButton>

          <Button
            variant="contained"
            size="small"
            component={Link}
            to="/login"
            startIcon={<Person />}
            style={{
              marginLeft: 16,
              backgroundColor: "#1DB954",
              borderRadius: "20px",
              padding: "4px 16px",
            }}
          >
            Log In
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80)",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>

        <Container maxWidth="xl" className="relative z-10 text-center">
          <Typography
            variant="h1"
            component="h2"
            style={{
              fontWeight: 900,
              fontSize: "4rem",
              color: "#fff",
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            Your Music, <br />
            <span style={{ color: "#1DB954" }}>Your Vibe</span>
          </Typography>

          <Typography
            variant="h5"
            style={{
              color: "rgba(255,255,255,0.8)",
              marginBottom: 32,
              maxWidth: "600px",
              margin: "0 auto 32px",
            }}
          >
            Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the
            world.
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              component={Link}
              to="/signup"
              style={{
                backgroundColor: "#1DB954",
                borderRadius: "30px",
                padding: "12px 32px",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              Start Listening Free
            </Button>

            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/premium"
              style={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.5)",
                borderRadius: "30px",
                padding: "12px 32px",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              See Premium Plans
            </Button>
          </div>
        </Container>
      </div>

      {/* Featured Playlists Section */}
      <Container maxWidth="xl" style={{ marginTop: 64, marginBottom: 64 }}>
        <div className="flex justify-between items-center mb-8">
          <Typography variant="h4" component="h2" style={{ fontWeight: "bold", color: "#fff" }}>
            Featured Playlists
          </Typography>

          <Button
            endIcon={<Explore />}
            style={{
              color: "rgba(255,255,255,0.7)",
            }}
          >
            See All
          </Button>
        </div>

        <Grid container spacing={3}>
          {featuredPlaylists.map((playlist) => (
            <Grid item xs={12} sm={6} md={4} key={playlist.id}>
              <Paper
                elevation={3}
                style={{
                  backgroundColor: "#181818",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => playPlaylist(playlist)}
              >
                <div className="relative">
                  <CardMedia component="img" height="220" image={playlist.image} alt={playlist.title} />
                  <div
                    className="absolute bottom-2 right-2 opacity-0 transform translate-y-4 scale-75 transition-all duration-300"
                    style={{
                      opacity: 0,
                      transform: "translateY(20px) scale(0.8)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <IconButton
                      style={{
                        backgroundColor: "#1DB954",
                        color: "#fff",
                      }}
                    >
                      <PlayArrow fontSize="large" />
                    </IconButton>
                  </div>
                </div>

                <CardContent>
                  <Typography variant="h6" component="div" style={{ fontWeight: "bold", color: "#fff" }}>
                    {playlist.title}
                  </Typography>

                  <div className="flex items-center mt-2 text-gray-400">
                    <Typography variant="body2" style={{ marginRight: 16 }}>
                      {playlist.songs} songs
                    </Typography>
                    <Typography variant="body2">{playlist.followers} followers</Typography>
                  </div>
                </CardContent>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why GrooveTunes Section */}
      <div style={{ backgroundColor: "#181818", padding: "64px 0" }}>
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            style={{ fontWeight: "bold", color: "#fff", marginBottom: 48 }}
          >
            Why Choose <span style={{ color: "#1DB954" }}>GrooveTunes</span>?
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <div className="flex flex-col items-center text-center p-6 h-full">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <Headphones style={{ fontSize: 40, color: "#1DB954" }} />
                </div>

                <Typography variant="h5" style={{ fontWeight: "bold", color: "#fff", marginBottom: 16 }}>
                  Extensive Music Library
                </Typography>

                <Typography variant="body1" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Access millions of songs from various genres and artists worldwide. Discover new music or enjoy your
                  favorites with our vast collection.
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div className="flex flex-col items-center text-center p-6 h-full">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <PlaylistAdd style={{ fontSize: 40, color: "#1DB954" }} />
                </div>

                <Typography variant="h5" style={{ fontWeight: "bold", color: "#fff", marginBottom: 16 }}>
                  Personalized Playlists
                </Typography>

                <Typography variant="body1" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Create and customize playlists for every mood and occasion. Our AI also recommends playlists based on
                  your listening habits.
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div className="flex flex-col items-center text-center p-6 h-full">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <Equalizer style={{ fontSize: 40, color: "#1DB954" }} />
                </div>

                <Typography variant="h5" style={{ fontWeight: "bold", color: "#fff", marginBottom: 16 }}>
                  High-Quality Audio
                </Typography>

                <Typography variant="body1" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Experience crystal-clear sound with our premium audio quality. Enjoy music the way artists intended it
                  to be heard.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* Top Trending Afrobeats Artists Section */}
      <Container maxWidth="xl" style={{ marginTop: 64, marginBottom: 64 }}>
        <div className="flex justify-between items-center mb-8">
          <Typography variant="h4" component="h2" style={{ fontWeight: "bold", color: "#fff" }}>
            Top Trending Afrobeats Artists
          </Typography>

          <Chip
            icon={<TrendingUp style={{ color: "#1DB954" }} />}
            label="Hot Now"
            style={{
              backgroundColor: "rgba(29, 185, 84, 0.15)",
              color: "#1DB954",
              fontWeight: "bold",
            }}
          />
        </div>

        <Grid container spacing={3}>
          {artists.map((artist) => (
            <Grid item xs={12} sm={6} md={4} key={artist.id}>
              <Card
                style={{
                  backgroundColor: "#181818",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => playArtist(artist)}
              >
                <div className="relative overflow-hidden">
                  <CardMedia
                    component="img"
                    height="320"
                    image={artist.image}
                    alt={artist.name}
                    style={{
                      transition: "transform 0.5s ease",
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300"
                    style={{
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      style={{
                        backgroundColor: "#1DB954",
                        borderRadius: "30px",
                        padding: "8px 24px",
                      }}
                    >
                      Play
                    </Button>
                  </div>
                </div>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ fontWeight: "bold", color: "#fff" }}
                      >
                        {artist.name}
                      </Typography>
                      <Typography variant="body2" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {artist.description}
                      </Typography>
                    </div>

                    <div className="flex items-center text-gray-400">
                      <IconButton
                        style={{
                          color: likedArtists[artist.id] ? "#1DB954" : "rgba(255,255,255,0.7)",
                        }}
                        onClick={(e) => toggleLike(artist.id, e)}
                      >
                        {likedArtists[artist.id] ? <Favorite /> : <FavoriteBorder />}
                      </IconButton>
                    </div>
                  </div>

                  <div className="flex mt-4 gap-2 flex-wrap">
                    {artist.genres.map((genre, index) => (
                      <Chip
                        key={index}
                        label={genre}
                        size="small"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <div style={{ backgroundColor: "#1DB954", padding: "64px 0" }}>
        <Container maxWidth="md">
          <div className="text-center text-white">
            <Typography variant="h3" component="h2" style={{ fontWeight: "bold", marginBottom: 24 }}>
              Ready to Start Grooving?
            </Typography>

            <Typography variant="h6" style={{ marginBottom: 32, opacity: 0.9 }}>
              Join millions of music lovers and discover your next favorite song today.
            </Typography>

            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/signup"
              style={{
                backgroundColor: "#fff",
                color: "#1DB954",
                borderRadius: "30px",
                padding: "12px 32px",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              Get Started Free
            </Button>
          </div>
        </Container>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: "#121212", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "48px 0" }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <div className="flex items-center mb-6">
                <MusicNote style={{ color: "#1DB954", fontSize: 32, marginRight: 8 }} />
                <Typography variant="h5" component="h1" style={{ fontWeight: "bold", color: "#1DB954" }}>
                  GrooveTunes
                </Typography>
              </div>

              <Typography variant="body2" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 24 }}>
                GrooveTunes is your ultimate music streaming platform. Discover, listen, and share music from around the
                world with our cutting-edge audio technology.
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "#fff", marginBottom: 16 }}>
                Company
              </Typography>

              <ul className="list-none p-0 m-0">
                <li className="mb-2">
                  <Button
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      padding: 0,
                      textTransform: "none",
                      justifyContent: "flex-start",
                    }}
                  >
                    About
                  </Button>
                </li>
                <li className="mb-2">
                  <Button
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      padding: 0,
                      textTransform: "none",
                      justifyContent: "flex-start",
                    }}
                  >
                    Jobs
                  </Button>
                </li>
              </ul>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "#fff", marginBottom: 16 }}>
                Communities
              </Typography>

              <ul className="list-none p-0 m-0">
                <li className="mb-2">
                  <Button
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      padding: 0,
                      textTransform: "none",
                      justifyContent: "flex-start",
                    }}
                  >
                    For Artists
                  </Button>
                </li>
                <li className="mb-2">
                  <Button
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      padding: 0,
                      textTransform: "none",
                      justifyContent: "flex-start",
                    }}
                  >
                    Developers
                  </Button>
                </li>
              </ul>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "#fff", marginBottom: 16 }}>
                Useful Links
              </Typography>

              <ul className="list-none p-0 m-0">
                <li className="mb-2">
                  <Button
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      padding: 0,
                      textTransform: "none",
                      justifyContent: "flex-start",
                    }}
                  >
                    Support
                  </Button>
                </li>
                <li className="mb-2">
                  <Button
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      padding: 0,
                      textTransform: "none",
                      justifyContent: "flex-start",
                    }}
                  >
                    Web Player
                  </Button>
                </li>
              </ul>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "#fff", marginBottom: 16 }}>
                Legal
              </Typography>

              <ul className="list-none p-0 m-0">
                <li className="mb-2">
                  <Button
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      padding: 0,
                      textTransform: "none",
                      justifyContent: "flex-start",
                    }}
                  >
                    Privacy Policy
                  </Button>
                </li>
                <li className="mb-2">
                  <Button
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      padding: 0,
                      textTransform: "none",
                      justifyContent: "flex-start",
                    }}
                  >
                    Terms of Use
                  </Button>
                </li>
              </ul>
            </Grid>
          </Grid>

          <Divider style={{ margin: "32px 0", borderColor: "rgba(255,255,255,0.1)" }} />

          <Typography variant="body2" style={{ color: "rgba(255,255,255,0.5)" }}>
            © 2025 GrooveTunes. All rights reserved.
          </Typography>
        </Container>
      </div>

      {/* Custom Audio Player Integration */}
      {isPlayerVisible && currentTrack && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            backgroundColor: "#181818",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: 16,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <img
                src={currentTrack.coverArt || "/placeholder.svg"}
                alt={currentTrack.title}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 4,
                  marginRight: 16,
                  objectFit: "cover",
                }}
              />
              <div>
                <Typography variant="subtitle1" style={{ color: "#fff", fontWeight: "bold" }}>
                  {currentTrack.title}
                </Typography>
                <Typography variant="body2" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {currentTrack.artist}
                </Typography>
              </div>
            </div>

            <div className="flex-2">
              <CustomAudioPlayer
                audioSrc={currentTrack.audioSrc}
                title={currentTrack.title}
                artist={currentTrack.artist}
                coverArt={currentTrack.coverArt}
              />
            </div>

            <IconButton
              onClick={closePlayer}
              style={{
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <Close />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
