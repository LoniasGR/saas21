import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Question from '../controllers/QuestionTile';
import Answer from '../controllers/AnswerTile';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
  },
  topPart: {
    margin: '3% auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTypography: {
    margin: '1% 0 1% 0',
  },
});

function Profile(props) {
  const {
    username,
    firstName,
    lastName,
    questions,
    answers,
  } = props;
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} className={classes.topPart}>
        <Typography variant="h2" align="center">{`${firstName} ${lastName} (${username})`}</Typography>
        <Divider />
      </Grid>
      <Grid item container direction="column" xs spacing={3}>
        <Grid item>
          <Typography className={classes.bottomTypography} variant="h3">My questions</Typography>
        </Grid>
        <Grid item container xs spacing={3}>
          {questions.map((question) => (
            <Grid item xs={4} key={question.id}>
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
      </Grid>
      <Grid item container direction="column" xs spacing={2}>
        <Grid item>
          <Typography className={classes.bottomTypography} variant="h3">My answers</Typography>
        </Grid>
        <Grid item container xs spacing={3}>
          {answers.map((answer) => (
            <Grid item xs={4} key={answer.id}>
              <Answer
                key={answer.id}
                answerOf={answer.answerOf}
                text={answer.text}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>

  //   container
  //   spacing={3}
  //   direction="column"
  // >
  //   <Grid item xs={12} className={classes.topPart}>
  //     <Typography variant="h2">{`${firstName} ${lastName} (${username})`}</Typography>
  //     <Divider />
  //   </Grid>
  //   <Grid
  //     item
  //     container
  //     direction="row"
  //     spacing={2}
  //   >
  //     <Grid container item direction="column">
  //       <Grid item xs={2}>
  //         <Typography className={classes.bottomTypography} variant="h3">
  // My questions
  // </Typography>
  //       </Grid>
  //       <Grid container item>
  //         {questions.map((question) => (
  //           <Grid item xs={2} key={question.id}>
  //             <Question
  //               key={question.id}
  //               id={question.id}
  //               title={question.title}
  //               description={question.description}
  //               askedBy={username}
  //             />
  //           </Grid>
  //         ))}
  //       </Grid>
  //     </Grid>
  //     <Grid container item direction="column">
  //       <Grid item>
  //         <Typography className={classes.bottomTypography} variant="h3">My answers</Typography>
  //       </Grid>
  //       <Grid container item>
  //         {answers.map((answer) => (
  //           <Grid item xs={2} key={answer.id}>
  //             <Answer
  //               key={answer.id}
  //               answerOf={answer.answerOf}
  //               text={answer.text}
  //             />
  //           </Grid>
  //         ))}
  //       </Grid>
  //     </Grid>
  //   </Grid>
  // </Grid>
  );
}

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Profile;
