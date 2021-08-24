import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '1em',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '32ch',
  },
}));

const Register = (props) => {
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    showPassword,
    duplicateUsername,
    duplicateEmail,
    handleRegister,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
  } = props;
  const classes = useStyles();
  return (
    <div>
      <form
        className={classes.root}
        onSubmit={handleRegister}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '80vh' }}
          spacing={2}
        >
          <h1>Sign Up</h1>
          <Grid item xs={3}>
            <FormControl
              variant="outlined"
              required
            >
              <TextField
                error={duplicateUsername}
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={handleChange}
                className={classes.textField}
                variant="outlined"
                helperText={duplicateUsername && 'Username already exists'}
                required
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl
              variant="outlined"
            >
              <TextField
                id="firstName"
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                className={classes.textField}
                variant="outlined"
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl
              variant="outlined"
            >
              <TextField
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                className={classes.textField}
                variant="outlined"
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl>
              <TextField
                required
                error={duplicateEmail}
                variant="outlined"
                type="email"
                id="email"
                label="Email"
                name="email"
                value={email}
                className={classes.textField}
                autoComplete="username"
                helperText={duplicateEmail && 'There is already a user with the given email'}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl
              required
              variant="outlined"
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
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
            </FormControl>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </Grid>
      </form>
    </div>
  );
};

Register.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  showPassword: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
  duplicateUsername: PropTypes.bool,
  duplicateEmail: PropTypes.bool,
  handleRegister: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleMouseDownPassword: PropTypes.func.isRequired,
};

Register.defaultProps = {
  duplicateUsername: false,
  duplicateEmail: false,
};
export default Register;
