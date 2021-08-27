import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Question from '../controllers/QuestionTile';

const useStyles = makeStyles(() => ({
  grid: {
  },
}));

function QuestionsFrontPage(props) {
  const { questions } = props;
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h2" align="center" gutterBottom>
        Recent questions
      </Typography>
      <Grid className={classes.grid} container spacing={2}>
        {questions.map((question) => (
          <Grid className={classes.grid} item xs sm md={4} lg={3} xl={2} key={question.id}>
            <Question
              key={question.id}
              id={question.id}
              title={question.title}
              description={question.description}
              askedBy={question.askedBy}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

QuestionsFrontPage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default QuestionsFrontPage;
