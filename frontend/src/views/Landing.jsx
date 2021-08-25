import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import QuestionsFrontPage from './QuestionsFrontPage';
import '../css/Landing.css';
import logo from '../logo.svg';

const useStyles = makeStyles({
  root: {
    width: '100%',

  },
});

function NoQuestions() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
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
  return (
    <div>
      <img src={logo} alt="AMA logo" />
      {
        (questions.length === 0) ? <NoQuestions /> : <QuestionsFrontPage questions={questions} />
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
