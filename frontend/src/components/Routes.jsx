import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';

import Landing from './Landing';
import LogIn from './LogIn';
import Register from './Register';
import NewQuestion from './NewQuestion';

function Routes(props) {
  const {
    redirect, loggedIn, token, handleLoggedIn,
  } = props;
  return (
    <Switch>
      <Route exact path="/"><Landing /></Route>
      { redirect
        && (
        <Route
          exact
          path="/login"
          render={() => (
            loggedIn
              ? <Redirect to="/" />
              : <LogIn handleLoggedIn={handleLoggedIn} />
          )}
        />
        )}
      {redirect
        && (
        <Route
          exact
          path="/register"
          render={() => (
            loggedIn
              ? <Redirect to="/" />
              : <Register handleLoggedIn={handleLoggedIn} />
          )}
        />
        )}
      {redirect
        && (
        <Route
          exact
          path="/ask-question"
          render={() => (
            loggedIn ? <NewQuestion token={token} />
              : <Redirect to="/login" />
          )}
        />
        )}
    </Switch>
  );
}

Routes.propTypes = {
  redirect: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  handleLoggedIn: PropTypes.func.isRequired,

};

export default Routes;
