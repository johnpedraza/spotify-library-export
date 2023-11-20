import React, { useEffect , useState} from 'react';
import spotifyApi, { loginUrl, setAccessToken } from '../services/SpotifyAuth';

const HomePage = () => {
  const [libraryData, setLibraryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    window.location.href = loginUrl;
  };

  const handleLogout = () => {
    window.location.href = 'www.google.com'; // placeholder
  };

  // Set token and confirm it was set
  setAccessToken();
  const isTokenSet = spotifyApi.getAccessToken();

  const handleFetchLibraryData = async () => {
    try {
      setIsLoading(true);

      // Fetch user's saved tracks (library) using the Spotify API
      const response = await spotifyApi.getMySavedTracks();

      const tracks = response.items.map((item) => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists.map((artist) => artist.name).join(', '),
        album: item.track.album.name,
      }));

      setLibraryData(tracks);
    } catch (error) {
      console.error('Error fetching library data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Spotify Exporter</h1>
      {isTokenSet ? (
        <>
        <p>Welcome! Access Token: {spotifyApi.getAccessToken()}</p>
          <button onClick={handleFetchLibraryData} disabled={isLoading}>
            {isLoading ? 'Fetching Library Data...' : 'Fetch Library Data'}
          </button>

          {libraryData.length > 0 && (
            <div>
              <h2>Library Data:</h2>
              <ul>
                {libraryData.map((track) => (
                  <li key={track.id}>
                    {track.title} - {track.artist} - {track.album}
                  </li>
                ))}
              </ul>
            </div>
          )}

        <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Spotify</button>
      )}
    </div>
  );
};

export default HomePage;
