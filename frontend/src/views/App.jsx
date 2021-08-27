import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Footer from '../controllers/Footer';
import Header from '../controllers/Header';
import Routes from '../controllers/Routes';

const useStyles = makeStyles(() => ({
  root: {
  },
}));

function App(props) {
  const {
    loggedIn,
    username,
    redirect,
    token,
    handleSignOut,
    handleLoggedIn,
  } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header
        loggedIn={loggedIn}
        username={username}
        handleSignOut={handleSignOut}
      />
      <Routes
        redirect={redirect}
        token={token}
        loggedIn={loggedIn}
        handleLoggedIn={handleLoggedIn}
      />
      <Footer />
    </div>
  );
}

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  redirect: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  handleLoggedIn: PropTypes.func.isRequired,
};
export default App;
