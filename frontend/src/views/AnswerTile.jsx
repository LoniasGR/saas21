import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300,
    minHeight: 230,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: '2%',
  },
  askedBy: {
    fontSize: 12,
    marginBottom: 4,
  },
  description: {
    marginTop: 11,
  },
  chip: {
    fontSize: 12,
  },
});

function Answer(props) {
  const {
    questionTitle, text, askedBy, keywords,
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.text} variant="h5" component="h2" gutterBottom>{text}</Typography>
        <Typography component="h3" color="textSecondary">{questionTitle}</Typography>
        <Typography className={classes.askedBy}>{`Asked by ${askedBy}`}</Typography>
        {keywords.map((keyword) => (
          <Chip className={classes.chip} key={keyword} label={keyword} />
        ))}
      </CardContent>
      <CardActions>
        <Button size="small">View question</Button>
      </CardActions>

    </Card>
  );
}

Answer.propTypes = {
  text: PropTypes.string.isRequired,
  questionTitle: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  askedBy: PropTypes.string.isRequired,
};

Answer.defaultProps = {
  keywords: [],
};

export default Answer;
