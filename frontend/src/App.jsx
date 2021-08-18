import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Landing from './components/Landing';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

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
            });
          } else {
            localStorage.removeItem('token');
          }
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
    const { loggedIn, username } = this.state;
    return (
      <div>
        <Header
          loggedIn={loggedIn}
          username={username}
          handleSignOut={this.handleSignOut}
        />
        <Switch>
          <Route exact path="/"><Landing /></Route>
          <Route exact path="/login"><LogIn handleLoggedIn={this.handleLoggedIn} /></Route>
          <Route exact path="/signup"><SignUp handleLoggedIn={this.handleLoggedIn} /></Route>
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
