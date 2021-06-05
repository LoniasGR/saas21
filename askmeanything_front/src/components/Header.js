import React from 'react';

import Navigation from './Navigation';

function Header() {
  return (
    <header>
      <Navigation
        userName="Leonidas"
        loggedIn="true"
      />
    </header>
  );
}

export default Header;
