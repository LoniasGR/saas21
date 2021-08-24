import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

function NewKeyword(props) {
  const {
    name,
    description,
    duplicateName,
    handleChange,
    handleKeywordCancellation,
    handleSubmitKeyword,
  } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        className={classes.root}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <h1>Add a keyword</h1>
        <Grid item xs="auto">
          <TextField
            error={duplicateName}
            id="keyword-name"
            label="Keyword Name"
            name="name"
            value={name}
            onChange={handleChange}
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            helperText={duplicateName && 'Keyword already exists'}
            required
            className={classes.textField}
          />
        </Grid>
        <Grid item xs="auto">
          <TextField
            id="keyword-description"
            label="Keyword Description"
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
          <Button
            onClick={handleSubmitKeyword}
            style={{ marginRight: 4 }}
            type="submit"
            variant="contained"
            color="primary"
            className="btn btn-success"
          >
            Submit keyword
          </Button>
          <Button
            style={{ marginLeft: 4 }}
            onClick={handleKeywordCancellation}
            variant="contained"
            color="primary"
            className="btn btn-success"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

NewKeyword.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  duplicateName: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleKeywordCancellation: PropTypes.func.isRequired,
  handleSubmitKeyword: PropTypes.func.isRequired,
};
export default NewKeyword;
