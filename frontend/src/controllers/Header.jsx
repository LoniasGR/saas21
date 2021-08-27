import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';

function Header(props) {
  const { loggedIn, username, handleSignOut } = props;
  return (
    <header>
      <Navigation
        userName={username}
        loggedIn={loggedIn}
        handleSignOut={handleSignOut}
      />
    </header>
  );
}

Header.propTypes = {
  username: PropTypes.string,
  loggedIn: PropTypes.bool,
  handleSignOut: PropTypes.func,
};

Header.defaultProps = {
  username: 'None',
  loggedIn: false,
  handleSignOut: null,
};

export default Header;
