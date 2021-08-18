import React from 'react';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      firstName, lastName, email, username, password,
    } = this.state;
    const { handleSignUp } = this.props;

    return (
      <div className="login-wrapper">
        <form onSubmit={
          (event) => handleSignUp(event, firstName, lastName, email, username, password)
        }
        >
          <label htmlFor="username">
            Username:
            <input
              type="text"
              placeholder="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label htmlFor="firstName">
            First name:
            <input
              type="text"
              placeholder="John"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label htmlFor="lastName">
            Last name:
            <input
              type="text"
              placeholder="Doe"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label htmlFor="email">
            Email:
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              autoComplete="username"
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label htmlFor="password">
            Password:
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  handleSignUp: propTypes.func,
};

SignUp.defaultProps = {
  handleSignUp: null,
};

export default SignUp;
