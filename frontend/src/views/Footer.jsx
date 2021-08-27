import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: '#3f51b5',
  },
  text: {
    position: 'relative',
    top: '30%',
    textAlign: 'center',
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Typography className={classes.text}>This is the footer!</Typography>
    </footer>
  );
}
export default Footer;
