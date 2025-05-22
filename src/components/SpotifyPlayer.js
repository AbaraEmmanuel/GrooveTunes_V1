"use client"

import { useState, useEffect } from "react"
import { Box, Typography, IconButton, Paper } from "@mui/material"
import { Close } from "@mui/icons-material"

const SpotifyPlayer = ({ spotifyLink, title, artist, coverArt, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  // Extract Spotify URI or ID from the link
  const getSpotifyEmbedUrl = (link) => {
    if (!link) return null

    try {
      // Handle different Spotify URL formats
      let spotifyId

      if (link.includes("spotify:")) {
        // Handle Spotify URI format (spotify:track:1234567890)
        spotifyId = link.split(":").pop()
      } else if (link.includes("spotify.com")) {
        // Handle web URL format (https://open.spotify.com/track/1234567890)
        spotifyId = link.split("/").pop().split("?")[0]
      } else {
        // Assume it's already an ID
        spotifyId = link
      }

      // Determine if it's a track, album, playlist, etc.
      let type = "track"
      if (link.includes("playlist")) {
        type = "playlist"
      } else if (link.includes("album")) {
        type = "album"
      } else if (link.includes("artist")) {
        type = "artist"
      }

      return `https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator`
    } catch (err) {
      console.error("Error parsing Spotify link:", err)
      setError("Invalid Spotify link format")
      return null
    }
  }

  const embedUrl = getSpotifyEmbedUrl(spotifyLink)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError("Failed to load Spotify content")
    setIsLoaded(false)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "#282828",
        color: "white",
        zIndex: 1000,
        p: 2,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={coverArt || "/placeholder.svg?height=60&width=60"}
            alt={title || "Album art"}
            style={{ width: 60, height: 60, borderRadius: 4, marginRight: 16, objectFit: "cover" }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {title || "Now Playing"}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
              {artist || "Artist"}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </Box>

      {error ? (
        <Box sx={{ textAlign: "center", py: 2, color: "error.main" }}>
          <Typography>{error}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Try opening this content directly on Spotify
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {!isLoaded && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "rgba(0,0,0,0.2)",
                zIndex: 1,
              }}
            >
              <Typography>Loading Spotify content...</Typography>
            </Box>
          )}
          {embedUrl && (
            <iframe
              style={{ borderRadius: "12px" }}
              src={embedUrl}
              width="100%"
              height="80"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              onLoad={handleLoad}
              onError={handleError}
            ></iframe>
          )}
        </Box>
      )}
    </Paper>
  )
}

export default SpotifyPlayer
