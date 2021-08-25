import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Question from '../components/QuestionTile';

function QuestionsFrontPage(props) {
  const { questions } = props;
  return (
    <div>
      <Typography variant="h2" align="center" gutterBottom>
        Recent questions
      </Typography>
      <Grid container spacing={2}>
        {questions.map((question) => (
          <Grid item xs={2} key={question.id}>
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
