import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import axios from 'axios';

const clientId = 'dfecf71217a549eea9c3e130bd92ca75';
const clientSecret = '4e65dfd3a8d74d97a4d48ce82b43f703';
let token = null;

async function getAccessToken() {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: 'grant_type=client_credentials'
  };

  try {
    const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
    token = response.data.access_token;
    return token;
  } catch (error) {
    console.error('Failed to get access token', error);
  }
}

async function fetchWebApi(endpoint, method, body) {
  if (!token) {
    await getAccessToken();
  }

  // const res = await fetch(`https://api.spotify.com/${endpoint}`, {
  const res = await fetch(`https://api.spotify.com/${endpoint.startsWith('v1/') ? '' : 'v1/'}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: body ? JSON.stringify(body) : null,
  });
  
  return await res.json();
}

async function searchArtists(artistQuery) {
  return fetchWebApi(
    `v1/search?q=${encodeURIComponent(artistQuery)}&type=artist&limit=10`,
    'GET'
  );
}



async function searchSongs(songQuery) {
  return fetchWebApi(
    `v1/search?q=${encodeURIComponent(songQuery)}&type=track&limit=50`,
    'GET'
  );
}

const playlistIds = [
  '4q00AtmbG4XZaNOFKkDjrg',
  '3ymQqPtFEu1bn0ZEJD5oIu',
  '37i9dQZF1EIXlU4rYVqFMQ',
  '1YKhA3kvAy1Lz16e9GTeUh',
  '37i9dQZF1DZ06evO22OCjn',
];

async function fetchPopularTracks() {
  try {
    const allTracks = [];

    for (const playlistId of playlistIds) {
      const response = await fetchWebApi(`v1/playlists/${playlistId}/tracks?limit=100`, 'GET');

      if (!response || !response.items) continue;

      const tracks = response.items
        .map(item => item.track)
        //.filter(track => track?.preview_url);

      const formatted = tracks.map(track => {
        const album = track.album || {};
        const images = album.images || [];

        return {
          id: track.id,
          name: track.name,
          preview_url: track.preview_url || null,
          hasPreview: Boolean(track.preview_url),
          albumArt: images[0]?.url || 'https://example.com/default-image.jpg',
          artists: track.artists.map(artist => artist.name).join(', '),
        };
      });

      console.log(`Fetched ${response.items.length} items from playlist ${playlistId}`);
      console.log(`${tracks.length} tracks have a preview_url`);


      allTracks.push(...formatted);
    }

    return allTracks;
  } catch (error) {
    console.error('Error in fetchPopularTracks:', error);
    return [];
  }
}

const getRandomSongs = async () => {
  try {
    const tracks = await fetchPopularTracks();
    const shuffledTracks = tracks.sort(() => 0.5 - Math.random());
    return shuffledTracks.slice(0, 20);
    console.log(`Total tracks after merging: ${tracks.length}`);
  } catch (error) {
    console.error('Failed to fetch random songs', error);
    return [];
  }
  
};

export { fetchWebApi, searchArtists, searchSongs, fetchPopularTracks, getRandomSongs };
