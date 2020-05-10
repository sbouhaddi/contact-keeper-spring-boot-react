import React, { useContext, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faIdCardAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = (props) => {
  const { title } = props;
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { clearContacts } = useContext(ContactContext);

  const handleLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={handleLogout} href='#!'>
          <FontAwesomeIcon icon={faSignOutAlt} />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div>
      <nav className='navbar bg-primary'>
        <h1>
          <FontAwesomeIcon icon={faIdCardAlt} />
          {'  '}
          {title}
        </h1>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      </nav>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'Contacts keeper',
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
