import React from 'react';
import propTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
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
    const { username, password } = this.state;
    const { handleLogIn } = this.props;

    return (
      <div className="login-wrapper">
        <form onSubmit={() => handleLogIn(username, password)}>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
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
              value={password}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <button type="button">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  handleLogIn: propTypes.func,
};

Login.defaultProps = {
  handleLogIn: null,
};

export default Login;
