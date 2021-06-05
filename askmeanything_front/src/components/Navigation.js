import React from 'react';
import PropTypes from 'prop-types';

import '../css/Navigation.css';

function Navigation(props) {
  const username = props.userName;
  const loggedIn  = (props.loggedIn === 'true');

  if (!loggedIn) {
    return (
      <nav>
        <ul>
          <li><a className="active" href="/">Home</a></li>
          <li className="pos_right"><a href="/">Sign In</a></li>
          <li className="pos_right"><a href="/">Sign Up</a></li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul>
        <li><a className="active" href="/">Home</a></li>
        <li className="pos_right"><a href="/">Sign Out</a></li>
        <li className="pos_right usr_welcome">
          Welcome,
          {`${username}`}
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  userName: PropTypes.string,
  loggedIn: PropTypes.string,
};

export default Navigation;
