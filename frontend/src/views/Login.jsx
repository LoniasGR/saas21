/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '&. MuiFormControl-root': {
      width: '100%',
      margin: '1em',
    },
  },
});

const Login = (props) => {
  const {
    username,
    password,
    showPassword,
    unknownUser,
    wrongPassword,
    handleLogIn,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
  } = props;
  const classes = useStyles();

  return (
    <div>
      <form
        className={classes.root}
        onSubmit={(event) => {
          handleLogIn(event, username, password);
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
                onChange={handleChange}
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
                onChange={handleChange}
                aria-describedby="component-helper-text"
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
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
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  showPassword: PropTypes.bool,
  unknownUser: PropTypes.bool,
  wrongPassword: PropTypes.bool,
  handleLogIn: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleMouseDownPassword: PropTypes.func.isRequired,
};

Login.defaultProps = {
  showPassword: false,
  unknownUser: false,
  wrongPassword: false,
};

export default Login;
