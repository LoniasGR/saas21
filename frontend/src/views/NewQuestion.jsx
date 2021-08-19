import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100ch',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function NewQuestion(props) {
  const {
    title,
    description,
    keywords,
    possibleKeywords,
    handleChange,
    handleAutocompleteChange,
    handleSubmitQuestion,
  } = props;
  const classes = useStyles();
  return (
    <div>
      <form onSubmit={(event) => {
        handleSubmitQuestion(event);
      }}
      >
        <Grid
          className={classes.root}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <h1>Ask a Question</h1>
          <Grid item xs="auto">
            <TextField
              id="question-title"
              label="Question Title"
              name="title"
              value={title}
              onChange={handleChange}
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              className={classes.textField}
            />
          </Grid>
          <Grid item xs="auto">
            <TextField
              id="question-description"
              label="Question Description"
              name="description"
              style={{ margin: 8 }}
              value={description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              multiline
              className={classes.textField}
            />
          </Grid>
          <Grid item xs="auto">
            <Autocomplete
              multiple
              name="keywords"
              className={classes.textField}
              id="keywords-autocomplete"
              options={possibleKeywords}
              value={keywords}
              onChange={handleAutocompleteChange}
              renderInput={(params) => (
                <TextField
                // eslint-disable-next-line
                  {...params}
                  variant="outlined"
                  label="Keywords"
                />
              )}
            />
          </Grid>
          <Grid item xs="auto">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="btn btn-success"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

NewQuestion.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  possibleKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAutocompleteChange: PropTypes.func.isRequired,
  handleSubmitQuestion: PropTypes.func.isRequired,
};

export default NewQuestion;
