import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import LogIn from './LogIn';
// import SignUp from './SignUp';
// import Landing from './Landing';

import '../css/Navigation.css';

function Navigation(props) {
  const {
    userName, loggedIn, handleSignOut,
  } = props;

  if (!loggedIn) {
    return (
      <nav>
        <ul>
          <li><Link className="active" to="/">Home</Link></li>
          <li className="pos_right"><Link to="/login">Log In</Link></li>
          <li className="pos_right"><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul>
        <li><Link className="active" to="/">Home</Link></li>
        <li className="pos_right"><Link to="/" replace onClick={handleSignOut}>Sign Out</Link></li>
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
