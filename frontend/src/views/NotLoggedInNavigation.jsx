import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';

import '../css/Navigation.css';

function NotLoggedInNavigation() {
  return (
    <nav>
      <ul className="navList">
        <li className="pos_left"><Link className={clsx('active', 'nav_anchor')} component={RouterLink} to="/" underline="none" color="initial">Home</Link></li>
        <li className="pos_right"><Link className="nav_anchor" component={RouterLink} to="/login" underline="none" color="initial">Log In</Link></li>
        <li className="pos_right"><Link className="nav_anchor" component={RouterLink} to="/register" underline="none" color="initial">Register</Link></li>
      </ul>
    </nav>
  );
}

export default NotLoggedInNavigation;
