import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Question from '../controllers/QuestionTile';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
  },
  topPart: {
    margin: '3% auto',
  },
  bottomTypography: {
    margin: '1% 0 1% 0',
  },
});

function Profile(props) {
  const {
    username, firstName, lastName, questions,
  } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item className={classes.topPart}>
          <Typography variant="h2">{`${firstName} ${lastName} (${username})`}</Typography>
        </Grid>
      </Grid>
      <Divider />
      <Typography className={classes.bottomTypography} variant="h3">My questions</Typography>
      <Grid container spacing={2}>
        {questions.map((question) => (
          <Grid item xs={2} key={question.id}>
            <Question
              key={question.id}
              id={question.id}
              title={question.title}
              description={question.description}
              askedBy={username}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Profile;
