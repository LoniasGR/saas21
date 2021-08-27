import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    marginTop: '5%',
    marginLeft: '25%',
    paddingBottom: '6%',

  },
  gridItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    marginTop: '6%',
  },
  gridSeparator: {
    marginTop: '5%',
  },
  userName: {
    marginLeft: '30%',
  },
  chip: {
    fontSize: 12,
  },
  textField: {
    width: '50%',
    margin: 8,
  },
});

function QuestionPage(props) {
  const {
    loggedIn,
    title,
    description,
    askedBy,
    keywords,
    answers,
    newAnswerText,
    handleChange,
    submitNewAnswer,
  } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid
        className={classes.root}
        container
        direction="column"
        spacing={2}
      >
        <Grid item xs={6}>
          <Paper className={classes.gridItem}>
            <Grid container>
              <Grid item xs={2}>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  className={classes.userName}
                >
                  {askedBy}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                >
                  {title}
                </Typography>
                {keywords.map((keyword) => (
                  <Chip className={classes.chip} key={keyword} label={keyword} />
                ))}
                <Typography className={classes.description}>
                  {description}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item container xs={6} direction="column">
          <Typography variant="h4">Answers</Typography>
          {answers.map((answer) => (
            <Grid className={classes.gridSeparator} item key={answer.id}>
              <Paper key={answer.id}>
                <Grid container spacing={4}>
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      className={classes.userName}
                    >
                      {answer.answerBy}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{answer.text}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
        { loggedIn ? (
          <div>
            <Grid item className={classes.gridSeparator}>
              <TextField
                id="answer-text"
                label="My answer"
                name="newAnswerText"
                value={newAnswerText}
                onChange={handleChange}
                variant="outlined"
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <Button onClick={submitNewAnswer} variant="contained" color="primary">Add answer</Button>
            </Grid>
          </div>
        )
          : (
            <Grid item>
              <Typography variant="h5">Register or Login to answer.</Typography>
            </Grid>
          )}
      </Grid>
    </div>
  );
}

QuestionPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  askedBy: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  answers: PropTypes.arrayOf(PropTypes.object),
  newAnswerText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  submitNewAnswer: PropTypes.func.isRequired,
};

QuestionPage.defaultProps = {
  keywords: [],
  answers: [],
};

export default QuestionPage;
