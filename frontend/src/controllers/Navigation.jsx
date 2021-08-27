import React from 'react';
import PropTypes from 'prop-types';

import NotLoggedInNavigation from '../views/NotLoggedInNavigation';
import LoggedInNav from '../views/LoggedInNavigation';

function Navigation(props) {
  const {
    userName, loggedIn, handleSignOut,
  } = props;

  if (!loggedIn) {
    return (
      <NotLoggedInNavigation />
    );
  }
  return (
    <LoggedInNav
      userName={userName}
      handleSignOut={handleSignOut}
    />
  );
}

Navigation.propTypes = {
  userName: PropTypes.string,
  loggedIn: PropTypes.bool,
  handleSignOut: PropTypes.func,
};

Navigation.defaultProps = {
  userName: 'None',
  loggedIn: false,
  handleSignOut: null,
};

export default Navigation;
