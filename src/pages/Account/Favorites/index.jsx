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
    <div className="account-likes">
      <div className="tracks-list">
        {likesDetails && likesDetails.map((track) => (
          <div key={track.name}>
            <p>
              Titre de la piste :
              {track.name}
              Album :
              {track.album_name}
              Année :
              {track.album_year}
              <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteLike(track.id)} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
