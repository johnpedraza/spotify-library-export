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

  const handleExportToJson = () => {
    try {
      // Convert libraryData to a JSON string
      const jsonString = JSON.stringify(libraryData, null, 2);

      // Create a Blob containing the JSON string
      const blob = new Blob([jsonString], { type: 'application/json' });

      // Create a download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);

      // Set the filename for the download
      link.download = 'libraryData.json';

      // Append the link to the document and trigger the click event
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting to JSON:', error);
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
            <>
            <button onClick={handleExportToJson}>Export to JSON</button>
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
            </>
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
