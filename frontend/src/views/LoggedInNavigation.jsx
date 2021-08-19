import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import '../css/Navigation.css';

function LoggedInNav(props) {
  const {
    userName, handleSignOut,
  } = props;
  return (
    <nav>
      <ul>
        <li><Link className="active" component={RouterLink} to="/" underline="none" color="initial">Home</Link></li>
        <li className="pos_right"><Link component={RouterLink} to="/" replace onClick={handleSignOut} underline="none" color="initial">Sign Out</Link></li>
        <li className="pos_right"><Link component={RouterLink} to="/ask-question" underline="none" color="initial">Ask a Question</Link></li>
        <li className="pos_right"><Link component={RouterLink} to="/" underline="none" color="initial">Profile</Link></li>
        <li className="pos_right usr_welcome">
          Welcome,
          {` ${userName}`}
        </li>
      </ul>
    </nav>
  );
}

LoggedInNav.propTypes = {
  userName: PropTypes.string,
  handleSignOut: PropTypes.func,
};

LoggedInNav.defaultProps = {
  userName: 'None',
  handleSignOut: null,
};

export default LoggedInNav;
