import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { baseUrl } from '../constants';
import View from '../views/Register';

function handleMouseDownPassword(event) {
  event.preventDefault();
}
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      showPassword: false,
      duplicateUsername: false,
      duplicateEmail: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleClickShowPassword() {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleRegister(event) {
    event.preventDefault();
    const {
      firstName, lastName, username, password, email,
    } = this.state;

    this.setState({
      duplicateUsername: false,
      duplicateEmail: false,
    });
    axios({
      method: 'post',
      url: `${baseUrl}/api/auth/register`,
      data: {
        firstName: (firstName === '' ? null : firstName),
        lastName: (lastName === '' ? null : lastName),
        email,
        username,
        password,
      },
    })
      .then((response) => {
        const { handleLoggedIn, history } = this.props;
        handleLoggedIn(username, response.data.token);
        history.push('/');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          if (err.response.data.msg === 'username already exists') {
            this.setState({ duplicateUsername: true });
          } else if (err.response.data.msg === 'email already exists') {
            this.setState({ duplicateEmail: true });
          }
        }
      });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      showPassword,
      duplicateEmail,
      duplicateUsername,
    } = this.state;

    return (
      <div>
        <View
          firstName={firstName}
          lastName={lastName}
          email={email}
          username={username}
          password={password}
          showPassword={showPassword}
          duplicateUsername={duplicateUsername}
          duplicateEmail={duplicateEmail}
          handleRegister={this.handleRegister}
          handleChange={this.handleChange}
          handleClickShowPassword={this.handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
        />
      </div>
    );
  }
}

Register.propTypes = {
  handleLoggedIn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Register);
