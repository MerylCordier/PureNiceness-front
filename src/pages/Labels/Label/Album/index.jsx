/* eslint-disable react/prop-types */
import './index.css';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import AudioPlayer from 'react-h5-audio-player';
import fetchData from '../../../../services/api/call.api';
import 'react-h5-audio-player/lib/styles.css';

function Album({ oneAlbumSongs, setOneAlbumSongs, albumId }) {
  const [trackData, setTrackData] = useState(null);
  const handleClickPlay = async (track) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const fecthSoundData = await fetch(`${apiUrl}/tracks/${track.id}/audio`);
      if (!fecthSoundData.ok) {
        toast.error('Erreur lors du chargement de la musique');
        throw new Error('Erreur lors du chargement de la musique');
      }
      const audioBlob = await fecthSoundData.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setTrackData(audioUrl);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickAddLikes = async (track) => {
    const likeWithSuccess = await fetchData('GET', `tracks/${track.id}/likes`, null, true);
    if (likeWithSuccess) {
      setOneAlbumSongs((prevData) => prevData?.map((album) => ({
        ...album,
        tracks: album.tracks?.map((item) => ({
          ...item,
          liked: item.id === track.id ? !track.liked : item.liked,
        })),
      })));
    }
  };

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <>
      <div className="album-container">
        <h1 className="album-container__title">
          {oneAlbumSongs[0]?.name}
        </h1>
        {oneAlbumSongs.length && oneAlbumSongs[0].tracks.length
        // true: map over the tracks array of the first album
          ? (
            oneAlbumSongs[0].tracks.map((track) => (
              <div className="track-container" key={track.id}>
                <div className="track-cover-container">
                  <img className="track-cover" src={track.url_image} alt={track.name} />
                </div>
                <div className="track-play">
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="play-icon"
                    onClick={() => handleClickPlay(track)}
                  />
                </div>

                <div className="track-infos">
                  <div className="track-name">
                    {track.name}
                  </div>
                  <div className="track-year">
                    {track.year}
                  </div>
                </div>

                <div className="track-duration">
                  {formatDuration(track.duration)}
                </div>
                <div className="track-fav">
                  <FontAwesomeIcon
                    icon={track.liked ? solidStar : regularStar}
                    onClick={() => {
                      handleClickAddLikes(track);
                    }}
                    className="likes-icon"
                  />
                </div>
              </div>
            ))
          )
        // false: tell this at the user.
          : ('Aucun sons dans cet album')}
      </div>
      {trackData && (
      <div className="player-container">
        <AudioPlayer
          preload="metadata"
          src={trackData}
          className="audio-player"
          autoPlay
        />
      </div>
      )}
    </>
  );
}
export default Album;
