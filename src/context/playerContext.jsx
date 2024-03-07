import { useState, createContext } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { toast } from 'react-toastify';

export const PlayerContext = createContext();

function PlayerProvider({ children }) {
  const [trackData, setTrackData] = useState(null);
  const [nextTrackIndex, setNextTrackIndex] = useState(0);
  const [oneAlbumSongs, setOneAlbumSongs] = useState([]);
  
  const handleClickPlay = async (track, index) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const fetchSoundData = await fetch(`${apiUrl}/tracks/${track.id}/audio`);

      if (!fetchSoundData.ok) {
        toast.error('Erreur lors du chargement de la musique');
        throw new Error('Erreur lors du chargement de la musique');
      }

      const audioBlob = await fetchSoundData.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      setTrackData(audioUrl);

      const nextIndex = index < oneAlbumSongs[0].tracks.length - 1 ? index + 1 : 0;

      setNextTrackIndex(nextIndex);
    } catch (error) {
      console.error(error);
    }
  };
  const handleNextTrack = async () => {
    const nextId = oneAlbumSongs[0].tracks[nextTrackIndex].id;

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const fetchSoundData = await fetch(`${apiUrl}/tracks/${nextId}/audio`);

      if (!fetchSoundData.ok) {
        toast.error('Erreur lors du chargement de la musique');
        throw new Error('Erreur lors du chargement de la musique');
      }

      const audioBlob = await fetchSoundData.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      setTrackData(audioUrl);

      const nextIndex = nextTrackIndex < oneAlbumSongs[0].tracks.length - 1
        ? nextTrackIndex + 1
        : 0;

      setNextTrackIndex(nextIndex);
    } catch (error) {
      console.error(error);
    }
  };

  const playerValues = { handleClickPlay, oneAlbumSongs,setOneAlbumSongs };

  return (
    <PlayerContext.Provider value={playerValues}>
      {children}
      {trackData && (
      <div className="player-container">
        <AudioPlayer
          preload="metadata"
          src={trackData}
          className="audio-player"
          autoPlay
          onEnded={() => { handleNextTrack(nextTrackIndex); }}
        />

      </div>
      )}
    </PlayerContext.Provider>
  );
}
export default PlayerProvider;
