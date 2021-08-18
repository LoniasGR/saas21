/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

/* Material UI Imports */
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { FormControl, FormHelperText } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import { createStyles, withStyles } from '@material-ui/styles';

import { baseUrl } from '../constants';

const styles = (() => {
  createStyles({
    root: {
      '&. MuiFormControl-root': {
        width: '100%',
        margin: '1em',
      },
    },
  });
});
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

  static handleMouseDownPassword(event) {
    event.preventDefault();
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
        // eslint-disable-next-line
        console.error(error.response.status);
        // eslint-disable-next-line
        console.error(error.response.data);

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
    const { classes } = this.props;

    return (
      <div>

        <form
          className={classes.root}
          onSubmit={(event) => {
            this.handleLogIn(event, username, password);
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '80vh' }}
            spacing={2}
          >
            <h1>Log In</h1>
            <Grid item xs={3}>
              <FormControl
                required
                variant="outlined"
              >
                <TextField
                  error={unknownUser}
                  id="username"
                  label="Username"
                  autoComplete="username"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  helperText={unknownUser && 'User not found'}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={3} width={350}>
              <FormControl
                variant="outlined"
                required
                fullWidth
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  error={wrongPassword}
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={this.handleChange}
                  aria-describedby="component-helper-text"
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
              )}
                />
                <FormHelperText id="component-helper-text">
                  {wrongPassword && 'Password is incorrect'}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="btn btn-success"
              >
                <i className="fa fa-sign-in" />
                {' '}
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  handleLoggedIn: PropTypes.func.isRequired,
};

export default withStyles(styles)(withRouter(Login));
