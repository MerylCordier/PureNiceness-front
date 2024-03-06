/* eslint-disable react/no-unescaped-entities */
import './index.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import fetchData from '../../../services/api/call.api';

function Favorites({ userId }) {
  const [likesDetails, setLikesDetails] = useState([]);
  // Fetch likes data from the API
  const fetchLikesData = async (id) => {
    const fetchedLikesData = await fetchData('GET', `users/${id}/likes`, null, true);
    if (fetchedLikesData) {
      setLikesDetails(fetchedLikesData);
    }
  };

  const deleteLike = async (id) => {
    const isDeleteLike = await fetchData('GET', `tracks/${id}/likes`, null, true);
    if (isDeleteLike) {
      const likesDetailsUpdated = likesDetails.filter((tracks) => {
        if (tracks.track_id !== id) {
          return tracks;
        }
        return null;
      });
      setLikesDetails(likesDetailsUpdated);
      toast.success('Favoris supprimé');
    } else {
      toast.error('Erreur lors de la suppression du favoris');
    }
  };

  useEffect(() => {
    fetchLikesData(userId);
  }, []);

  return (

    <div className="tracks-containeur">
      {likesDetails && likesDetails.map((track) => (
        <div className="tracks-list" key={track.name}>
          <p>
            <span>Titre de la piste :</span>
            {track.name}
            <span>Album :</span>
            {track.album_name}
            <span>Année :</span>
            {track.album_year}
            <FontAwesomeIcon className="trash-can" icon={faTrashCan} onClick={() => deleteLike(track.id)} />
          </p>
        </div>
      ))}
    </div>

  );
}

export default Favorites;
