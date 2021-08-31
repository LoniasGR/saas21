import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import QuestionsFrontPage from './QuestionsFrontPage';

import logo from '../images/logo.png';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    minHeight: '100vh',
  },
  image: {
    display: 'block',
    margin: '10% auto',
    maxWidth: '40%',
  },
}));

function NoQuestions() {
  return (
    <div>
      <Typography variant="h2" align="center" gutterBottom>
        There are no questions.
        <br />
        Login or Register and ask one now!
      </Typography>
    </div>
  );
}

function Landing(props) {
  const { questions } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={logo} className={classes.image} alt="AMA logo" />
      {
        (questions === null || questions.length === 0)
          ? <NoQuestions />
          : <QuestionsFrontPage questions={questions} />
      }
    </div>
  );
}

Landing.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
};

Landing.defaultProps = {
  questions: null,
};
export default Landing;
