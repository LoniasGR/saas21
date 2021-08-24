import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

import NewKeyword from '../components/NewKeyword';

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
    newKeyword,
    possibleKeywords,
    token,
    handleChange,
    handleAddNewKeyword,
    handleNewKeywordButton,
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
            <FormControl
              required
              variant="outlined"
            >
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
            </FormControl>
          </Grid>
          <Grid item xs="auto">
            <FormControl
              required
              variant="outlined"
            >
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
            </FormControl>
          </Grid>
          <Grid item xs="auto">
            <FormControl>
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
            </FormControl>
          </Grid>
          {newKeyword ? (
            <NewKeyword
              token={token}
              handleKeywordCancellation={handleNewKeywordButton}
              handleAddNewKeyword={handleAddNewKeyword}
            />
          )
            : (
              <Grid item xs="auto">
                <Button
                  onClick={handleNewKeywordButton}
                  variant="contained"
                  color="secondary"
                  className="btn btn-success"
                >
                  Add new keyword
                </Button>
              </Grid>
            )}
          <Grid item xs="auto">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="btn btn-success"
            >
              Submit Question
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
  newKeyword: PropTypes.bool.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  possibleKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  token: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleNewKeywordButton: PropTypes.func.isRequired,
  handleAddNewKeyword: PropTypes.func.isRequired,
  handleAutocompleteChange: PropTypes.func.isRequired,
  handleSubmitQuestion: PropTypes.func.isRequired,
};

export default NewQuestion;
