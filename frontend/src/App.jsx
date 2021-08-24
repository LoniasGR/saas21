import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './components/Routes';

import verifyToken from './utils';

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
            localStorage.setItem('token', token);
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
    const {
      loggedIn, username, token, redirect,
    } = this.state;
    return (
      <div>
        <Header
          loggedIn={loggedIn}
          username={username}
          handleSignOut={this.handleSignOut}
        />
        <Routes />
        <Footer
          redirect={redirect}
          token={token}
          loggedIn={loggedIn}
          handleLoggedIn={this.handleLoggedIn}
        />
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
