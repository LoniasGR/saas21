import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Paper, Typography, Chip,
} from '@material-ui/core';

function QuestionPage(props) {
  const {
    title, description, askedBy, keywords, answers,
  } = props;
  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Paper>
            <Typography>{title}</Typography>
            <Typography>{description}</Typography>
            <Typography>{askedBy}</Typography>
            {keywords.map((keyword) => (
              <Chip key={keyword} label={keyword} />
            ))}
          </Paper>
        </Grid>
        {answers.map((answer) => (
          <Grid item key={answer.id}>
            <Paper key={answer.id}>
              <Typography>{answer.answerBy}</Typography>
              <Typography>{answer.text}</Typography>
            </Paper>
          </Grid>
        ))}

      </Grid>
    </div>
  );
}

QuestionPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  askedBy: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  answers: PropTypes.arrayOf(PropTypes.object),
};

QuestionPage.defaultProps = {
  keywords: [],
  answers: [],
};

export default QuestionPage;
