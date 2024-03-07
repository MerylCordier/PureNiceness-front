import { useState, createContext } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export const PlayerContext = createContext();

function PlayerProvider({ children }) {
  const [trackData, setTrackData] = useState(null);
  const [nextTrackIndex, setNextTrackIndex] = useState(0);
  const [nextTrackId, setNextTrackId] = useState(0);
  const [oneAlbumSongs, setOneAlbumSongs] = useState([]);
  const [likesDetails, setLikesDetails] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(true);
      setTrackData(audioUrl);

      if (oneAlbumSongs.length !== 0) {
        const nextIndex = index < oneAlbumSongs[0].tracks.length - 1 ? index + 1 : 0;
        setNextTrackIndex(nextIndex);
      } else {
        const nextIndex = index < likesDetails[0].lenght - 1 ? index + 1 : 0;
        setNextTrackIndex(nextIndex);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextTrack = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (oneAlbumSongs.length !== 0) {
      console.log('album', nextTrackIndex);
      const nextId = oneAlbumSongs[0].tracks[nextTrackIndex].id;
      //! nextId ok mais setNextTrackId ne se fait pas; utiliser un useEffect?
      setNextTrackId(nextId);
    } else {
      console.log('fav:', nextTrackIndex);
      const nextId = likesDetails[nextTrackIndex].id;
      //! nextId ok mais setNextTrackId ne se fait pas
      setNextTrackId(nextId);
    }

    try {
      const fetchSoundData = await fetch(`${apiUrl}/tracks/${nextTrackId}/audio`);

      if (!fetchSoundData.ok) {
        toast.error('Erreur lors du chargement de la musique');
        throw new Error('Erreur lors du chargement de la musique');
      }

      const audioBlob = await fetchSoundData.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      setTrackData(audioUrl);

      if (likesDetails) {
        const nextIndex = nextTrackIndex < likesDetails[0].length - 1
          ? nextTrackIndex + 1
          : 0;
        setNextTrackIndex(nextIndex);
      } else {
        const nextIndex = nextTrackIndex < oneAlbumSongs[0].tracks.length - 1
          ? nextTrackIndex + 1
          : 0;
        setNextTrackIndex(nextIndex);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePlayer = () => {
    setIsOpen(false);
  };

  const playerValues = {
    handleClickPlay,
    oneAlbumSongs,
    setOneAlbumSongs,
    likesDetails,
    setLikesDetails,
  };

  return (
    <PlayerContext.Provider value={playerValues}>
      {children}
      {trackData && isOpen && (
      <div className="player-container">
        <AudioPlayer
          preload="metadata"
          src={trackData}
          className="audio-player"
          autoPlay
          onEnded={() => { handleNextTrack(nextTrackIndex); }}
        />
        <div className="close-player">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="icon-close-player"
            onClick={() => { handleClosePlayer(); }}
          />
        </div>
      </div>
      )}
    </PlayerContext.Provider>
  );
}
export default PlayerProvider;
