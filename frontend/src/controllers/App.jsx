import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import AppView from '../views/App';

import { verifyToken } from '../lib/utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: '',
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
            localStorage.setItem('token', token);
            this.setState({
              loggedIn: true,
              username: data.username,
              token: data.newToken,
              redirect: true,
            });
          } else {
            localStorage.removeItem('token');
            this.setState({
              loggedIn: false,
              username: '',
              token: '',
              redirect: true,
            });
          }
        })
      // eslint-disable-next-line
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
      token: '',
    });
  }

  handleLoggedIn(username, token) {
    localStorage.setItem('token', token);
    this.setState({
      loggedIn: true,
      username,
      token,
    });
  }

  render() {
    /**
     * In order not to render and redirect the user multiple times,
     * we defer the redirection until `componentDidMount` finishes.
     * This improves a lot the user experience and doesn't end up with
     * wonky results.
     */
    const {
      loggedIn, username, token, redirect,
    } = this.state;
    return (
      <AppView
        loggedIn={loggedIn}
        username={username}
        token={token}
        redirect={redirect}
        handleSignOut={this.handleSignOut}
        handleLoggedIn={this.handleLoggedIn}
      />
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default withRouter(App);
