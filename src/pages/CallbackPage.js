import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import spotifyApi, { setAccessToken } from '../services/SpotifyAuth';

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is present in the URL and set it
    setAccessToken();
    const token = spotifyApi.getAccessToken()

    if (token) {
      navigate('/');
    } else {
      console.error('Access token not found.');
      // Redirect the user to homepage (maybe implement error page later)
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <p>Returning to homepage after successful login...</p>
    </div>
  );
};

export default CallbackPage;
