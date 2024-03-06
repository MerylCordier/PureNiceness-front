// Importing styles
import './index.css';

import { jwtDecode } from 'jwt-decode';

// Importing hooks from React
import { useState, useEffect } from 'react';

// Importing local files
import fetchData from '../../../services/api/call.api';
import Album from './Album';

function Label({ labelsWhithAlbums }) {
  // Defining state variables
  const [oneAlbumSongs, setOneAlbumSongs] = useState([]);
  const [albumId, setAlbumId] = useState(labelsWhithAlbums[0]?.id);

  let userId;
  const token = localStorage.getItem('authApiToken');
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
  }

  // Function to fetch data for one album
  const fetchAlbumData = async () => {
    // ajout condition si connécté ou pas
    if (userId) {
      const fetchOneAlbumData = await fetchData('GET', `albums/${albumId}/tracks/likes`, null, true);
      setOneAlbumSongs(fetchOneAlbumData);
    } else {
      const fetchOneAlbumData = await fetchData('GET', `albums/${albumId}/tracks`);
      setOneAlbumSongs(fetchOneAlbumData);
    }
  };

  // Event for selecting an album
  const handleClick = (id) => {
    setAlbumId(id);
  };

  // useEffect hook to trigger fetching album data when albumId changes
  useEffect(() => {
    if (albumId !== null) {
      fetchAlbumData();
    }
  }, [albumId]);

  useEffect(() => {
    setAlbumId(labelsWhithAlbums[0]?.id);
  }, [labelsWhithAlbums]);

  // Rendering the component
  return (
    // Mapping over all albums of all labels
    // Rendu de la liste de labels
    labelsWhithAlbums?.map((label) => (
      <div key={label.id}>
        {/* Displaying the label name */}
        <div className="label-name hero">
          {label.name}
        </div>
        <div className="label-container">
          {/* Displaying albums for the label */}
          <div className="label-albums">
            {label.albums?.map((album) => (
              <div className="list__album-container" key={album.id}>
                <img
                  className="list__album-image"
                  src={album.url_image}
                  alt={`Selectionner l'album ${album.name}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleClick(album.id)}
                />
                {/* Displaying the album name */}
                <div className="list__album-name">{album.name}</div>
              </div>
            ))}
          </div>
          {/* Rendering the Album component with the selected album's songs */}
          <Album
            oneAlbumSongs={oneAlbumSongs}
            setOneAlbumSongs={setOneAlbumSongs}

          />
        </div>
      </div>
    ))
  );
}

// Exporting the Label component
export default Label;
