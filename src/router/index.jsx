import React from 'react';

// Import des fonctions pour création du routeur
import { createBrowserRouter } from 'react-router-dom';

// Importation des composants
import App from '../app';
import Home from '../pages/Home';
import {
  Admin,
  UserAdmin,
  ArtistAdmin,
  LabelAdmin,
  AlbumAdmin,
  TrackAdmin,
  EventAdmin,
  MediaAdmin,
  MessageAdmin,
  Settings,
} from '../pages/Admin';
import Contact from '../pages/Contact';
import Account from '../pages/Account';
import Signup from '../pages/Auth/Signup';
import Labels from '../pages/Labels';
import Label from '../pages/Label';
import Events from '../pages/Events';
import Medias from '../pages/Medias';
import Signin from '../pages/Auth/Signin';

// Création du routeur
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/admin',
        element: <Admin />,
        children:
        [
          { path: 'users', element: <UserAdmin /> },
          { path: 'artists', element: <ArtistAdmin /> },
          { path: 'labels', element: <LabelAdmin /> },
          { path: 'albums', element: <AlbumAdmin /> },
          { path: 'tracks', element: <TrackAdmin /> },
          { path: 'events', element: <EventAdmin /> },
          { path: 'medias', element: <MediaAdmin /> },
          { path: 'messages', element: <MessageAdmin /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
      { path: '/contact', element: <Contact /> },
      { path: '/account', element: <Account /> },
      { path: '/signin', element: <Signin /> },
      { path: '/signup', element: <Signup /> },
      { path: '/events', element: <Events /> },
      { path: '/medias', element: <Medias /> },
      {
        path: '/labels',
        element: <Labels />,
        children: [{ path: '/labels/:id', element: <Labels /> }],
      },
    ],
  },
]);

export default router;