import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import '../css/Navigation.css';

function Navigation(props) {
  const {
    userName, loggedIn, handleSignOut,
  } = props;

  if (!loggedIn) {
    return (
      <nav>
        <ul>
          <li><Link className="active" component={RouterLink} to="/" underline="none" color="initial">Home</Link></li>
          <li className="pos_right"><Link component={RouterLink} to="/login" underline="none" color="initial">Log In</Link></li>
          <li className="pos_right"><Link component={RouterLink} to="/signup" underline="none" color="initial">Sign Up</Link></li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul>
        <li><Link className="active" component={RouterLink} to="/" underline="none" color="initial">Home</Link></li>
        <li className="pos_right"><Link component={RouterLink} to="/" replace onClick={handleSignOut} underline="none" color="initial">Sign Out</Link></li>
        <li className="pos_right usr_welcome">
          Welcome,
          {' '}
          {`${userName}`}
        </li>
      </ul>
    </nav>
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
