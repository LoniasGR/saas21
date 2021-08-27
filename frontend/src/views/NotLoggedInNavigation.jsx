import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  navItem: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
  rightSide: {
    marginLeft: 0,
    position: 'relative',
  },
  navButton: {
    textTransform: 'none',
    fontSize: 18,
  },
}));

function NotLoggedInNavigation() {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar>
        <Grid container justifyContent="space-between" spacing={10}>
          <Grid item>
            <Button className={clsx(classes.navItem, classes.rightSide, classes.navButton)} component={RouterLink} to="/" underline="none" color="inherit">Home</Button>
          </Grid>
          <Grid item>
            <Button className={clsx(classes.navItem, classes.rightSide, classes.navButton)} component={RouterLink} to="/login" underline="none" color="inherit">Log In</Button>
            <Button className={clsx(classes.navItem, classes.rightSide, classes.navButton)} component={RouterLink} to="/register" underline="none" color="inherit">Register</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NotLoggedInNavigation;
