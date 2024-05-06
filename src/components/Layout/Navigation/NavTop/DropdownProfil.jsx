import './DropdownProfil.css';

import { useEffect, useContext } from 'react';
import { faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../../../Common/Dropdown';
import { UserContext } from '../../../../context/userContext';

function DropdownProfil() {
  const { isConnected, setIsConnected } = useContext(UserContext);

  const loggedLinks = [
    { id: 1, path: '/account', label: 'Profil' },
    { id: 2, path: `/account#informations`, label: 'Mes informations' },
    { id: 3, path: '/account#favorites', label: 'Mes favoris' },
    // { id: 4, path: '/account#messages', label: 'Mes messages' },
    { id: 5, path: '/signout', label: 'Me déconnecter' },
  ];

  const loggedOutLinks = [
    { id: 1, path: '/signin', label: 'Se connecter' },
    { id: 2, path: '/signup', label: 'S\'inscrire' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('authApiToken');
    if (token) {
      setIsConnected(true);
    }
  }, []);

  return (
    isConnected ? (
      <div className="navbar-top-icon">
        <Dropdown title="" icon={faUser} links={loggedLinks} caret={false} />
      </div>
    ) : (
      <div className="navbar-top-icon">
        <Dropdown title="" icon={faRightToBracket} links={loggedOutLinks} caret={false} />
      </div>
    )
  );
}

export default DropdownProfil;
