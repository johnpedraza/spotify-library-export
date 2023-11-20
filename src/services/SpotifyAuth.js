import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();
const redirectUri = process.env.REACT_APP_REDIRECT_URI

export const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID

// Redirect the user to the Spotify authorization page
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;

// Parse the token from the URL after successful authorization
export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

// Set the token to the Spotify API instance
export const setAccessToken = () => {
  const token = getTokenFromUrl();
  if (token.access_token) {
    spotifyApi.setAccessToken(token.access_token);
    return true;
  }
  return false;
};

export default spotifyApi;
