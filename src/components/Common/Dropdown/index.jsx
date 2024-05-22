import PropTypes from 'prop-types';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import fetchData from '../../../services/api/call.api';
import { UserContext } from '../../../context/userContext';

function Dropdown({
  title, icon, links, caret,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, setIsConnected } = useContext(UserContext);
  const { isAdmin, setIsAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickLink = () => {
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    if (!isOpen) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setIsHovered(false);
  };

  const logout = async () => {
    const isLoggedOut = await fetchData('GET', 'auth/signout', null, true);
    if (isLoggedOut) {
      localStorage.removeItem('authApiToken');
      setIsConnected(false);
      setIsAdmin(false);
      closeDropdown();
      navigate('/', { state: { from: location }, replace: true });
    }
  };

  return (
    <div
      className={`dropdown is-hoverable is-right ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="dropdown-trigger"
        onClick={toggleDropdown}
      >
        <span className="navbar-text">{title}</span>
        <FontAwesomeIcon className="navbar-icon" icon={icon} />
        {caret ? <FontAwesomeIcon icon={faCaretDown} aria-haspopup="true" aria-controls="dropdown-menu4" /> : null}
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu4" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              {links.map((link) => (
                (link.path !== '/signout')
                  ? (
                    <Link
                      key={link.id}
                      to={link.path}
                      //appeler fonction qui change la classe de l'élément parent
                      className={link.path.includes('/labels') ? 'at-bottom' : ''}
                      onClick={() => { handleClickLink(); closeDropdown(); }}
                    >
                      {link.label}
                    </Link>
                  )
                  : (
                    <button
                      key={link.id}
                      type="submit"
                      onClick={logout}
                    >
                      {link.label}
                    </button>
                  )

              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  caret: PropTypes.bool,
};

Dropdown.defaultProps = {
  caret: true,
};

export default Dropdown;
