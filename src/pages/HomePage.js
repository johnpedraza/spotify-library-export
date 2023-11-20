import React from 'react';
import { loginUrl, setAccessToken } from '../services/SpotifyAuth';

const HomePage = () => {
  const handleLogin = () => {
    window.location.href = loginUrl;
  };

  const handleLogout = () => {
    window.location.href = 'www.google.com'; // placeholder
  };

  // Check if the token is present in the URL and set it
  const isTokenSet = setAccessToken();

  return (
    <div>
      <h1>Spotify Exporter</h1>
      {isTokenSet ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login with Spotify</button>
      )}
    </div>
  );
};

export default HomePage;
