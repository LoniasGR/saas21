import React from 'react';
import { useHistory } from 'react-router-dom';

import NotFoundView from '../views/NotFound';

function NotFound() {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  return (
    <div>
      <NotFoundView
        handleClick={handleClick}
      />
    </div>
  );
}

export default NotFound;
