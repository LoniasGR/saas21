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
    maxHeight: 230,

  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    margin: 'auto',
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

function Question(props) {
  const {
    title, description, keywords, askedBy,
  } = props;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>

        <Typography variant="h5" component="h2" gutterBottom>{title}</Typography>
        <Typography className={classes.askedBy} component="h3" color="textSecondary">{`Asked by ${askedBy}`}</Typography>
        {keywords.map((keyword) => (
          <Chip className={classes.chip} key={keyword} label={keyword} />
        ))}
        <Typography variant="body2" component="p" className={classes.description}>{description}</Typography>

      </CardContent>
      <CardActions>
        <Button size="small">See Answers</Button>
      </CardActions>
    </Card>
  );
}

Question.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  askedBy: PropTypes.string.isRequired,
};

Question.defaultProps = {
  keywords: [],
};
export default Question;
