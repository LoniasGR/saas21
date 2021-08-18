/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import View from '../views/Login';
import { baseUrl } from '../constants';

function handleMouseDownPassword(event) {
  event.preventDefault();
}
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      showPassword: false,
      unknownUser: false,
      wrongPassword: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClickShowPassword() {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  }

  handleLogIn(event, username, password) {
    event.preventDefault();
    this.setState({ unknownUser: false, wrongPassword: false });
    axios.post(`${baseUrl}/api/auth/login`, { username, password })
      .then((response) => {
        const { handleLoggedIn } = this.props;
        handleLoggedIn(username, response.data.token);
        const { history } = this.props;
        history.push('/');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          if (error.response.data.msg === 'User not found') {
            this.setState({ unknownUser: true });
          } else if (error.response.data.msg === 'Wrong password') {
            this.setState({ wrongPassword: true });
          }
        }
      });
  }

  render() {
    const {
      username, password, showPassword, unknownUser, wrongPassword,
    } = this.state;

    return (
      <div>
        <View
          username={username}
          password={password}
          showPassword={showPassword}
          unknownUser={unknownUser}
          wrongPassword={wrongPassword}
          handleLogIn={this.handleLogIn}
          handleChange={this.handleChange}
          handleClickShowPassword={this.handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
        />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  handleLoggedIn: PropTypes.func.isRequired,
};

export default withRouter(Login);
