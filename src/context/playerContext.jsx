import { useState, createContext } from 'react';
import AudioPlayer from 'react-h5-audio-player';

export const PlayerContext = createContext();

function PlayerProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerValues = { isPlaying, setIsPlaying };

  return (
    <PlayerContext.Provider value={playerValues}>
      {children}
      <div className="player-container">
        <AudioPlayer
          preload="metadata"
          src={trackData}
          className="audio-player"
          autoPlay
          onEnded={() => { handleNextTrack(nextTrackIndex); }}
        />

      </div>
    </PlayerContext.Provider>
  );
}
export default PlayerProvider;
