import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route, withRouter, Redirect,
} from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Landing from './components/Landing';
import LogIn from './components/LogIn';
import Register from './components/Register';
import NewQuestion from './components/NewQuestion';

import verifyToken from './utils';
import './css/App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: '',
      // eslint-disable-next-line
      token: '',
      redirect: false,
    };
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleLoggedIn = this.handleLoggedIn.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token)
        .then((data) => {
          if ((data !== undefined) && (data.username !== null)) {
            this.setState({
              loggedIn: true,
              username: data.username,
              // eslint-disable-next-line
              token: data.newToken,
              redirect: true,
            });
          } else {
            localStorage.removeItem('token');
            this.setState({
              loggedIn: false,
              username: '',
              // eslint-disable-next-line
              token: '',
              redirect: true,
            });
          }
        })
        .catch((err) => console.error(err));
    } else {
      this.setState({
        redirect: true,
      });
    }
  }

  handleSignOut() {
    localStorage.removeItem('token');
    this.setState({
      loggedIn: false,
      username: '',
      // eslint-disable-next-line
      token: '',
    });
  }

  handleLoggedIn(username, token) {
    localStorage.setItem('token', token);
    this.setState({
      loggedIn: true,
      username,
    });
  }

  render() {
    /**
     * In order not to render and redirect the user multiple times,
     * we defer the redirection until `componentDidMount` finishes.
     * This improves a lot the user experience and doesn't end up with
     * wonky results.
     */
    const { loggedIn, username, redirect } = this.state;
    return (
      <div>
        <Header
          loggedIn={loggedIn}
          username={username}
          handleSignOut={this.handleSignOut}
        />
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
                : <LogIn handleLoggedIn={this.handleLoggedIn} />
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
                : <Register handleLoggedIn={this.handleLoggedIn} />
            )}
          />
          )}
          {redirect
          && (
          <Route
            exact
            path="/ask-question"
            render={() => (
              loggedIn ? <NewQuestion />
                : <Redirect to="/login" />
            )}
          />
          )}
        </Switch>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default withRouter(App);
