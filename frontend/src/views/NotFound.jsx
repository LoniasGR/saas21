import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  text: {
  },
}));

function NotFound(props) {
  const { handleClick } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ minHeight: '90vh' }}
      >
        <Grid item xs={12}>
          <Typography variant="h3">The Page you are looking for does not exist.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleClick}>Go Home</Button>
        </Grid>
      </Grid>
    </div>
  );
}

NotFound.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default NotFound;
