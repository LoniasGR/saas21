import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import '../css/Navigation.css';

function NotLoggedInNavigation() {
  return (
    <nav>
      <ul>
        <li><Link className="active" component={RouterLink} to="/" underline="none" color="initial">Home</Link></li>
        <li className="pos_right"><Link component={RouterLink} to="/login" underline="none" color="initial">Log In</Link></li>
        <li className="pos_right"><Link component={RouterLink} to="/register" underline="none" color="initial">Sign Up</Link></li>
      </ul>
    </nav>
  );
}

export default NotLoggedInNavigation;
