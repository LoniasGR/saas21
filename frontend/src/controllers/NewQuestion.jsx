import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import NewQuestionView from '../views/NewQuestion';
import { keywordsAPIUrl, questionsAPIUrl } from '../lib/constants';

class NewQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      keywords: [],
      possibleKeywords: [],
      newKeyword: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
    this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
    this.handleNewKeywordButton = this.handleNewKeywordButton.bind(this);
    this.handleAddNewKeyword = this.handleAddNewKeyword.bind(this);
  }

  componentDidMount() {
    axios.get(`${keywordsAPIUrl}/`)
      .then((response) => {
        const keywordNames = response.data.keywords.map((keyword) => keyword.name);
        this.setState({ possibleKeywords: keywordNames });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleAutocompleteChange(event, value) {
    this.setState({
      keywords: value,
    });
  }

  handleNewKeywordButton(event) {
    event.preventDefault();

    this.setState((prevState) => ({ newKeyword: !prevState.newKeyword }));
  }

  handleAddNewKeyword() {
    axios.get(`${keywordsAPIUrl}/`)
      .then((response) => {
        const keywordNames = response.data.keywords.map((keyword) => keyword.name);
        this.setState({ possibleKeywords: keywordNames, newKeyword: false });
      });
  }

  handleSubmitQuestion(event) {
    event.preventDefault();

    const { token } = this.props;
    const { title, description, keywords } = this.state;
    axios.post(`${questionsAPIUrl}/new`, { title, description, keywords }, { headers: { Authorization: `${token}` } })
      .then(() => {
        const { history } = this.props;
        history.push('/');
      })
    // eslint-disable-next-line
      .catch((err) => { console.error(err); });
  }

  render() {
    const {
      title, description, keywords, newKeyword, possibleKeywords,
    } = this.state;
    const { token } = this.props;
    return (
      <NewQuestionView
        title={title}
        description={description}
        newKeyword={newKeyword}
        keywords={keywords}
        possibleKeywords={possibleKeywords}
        token={token}
        handleChange={this.handleChange}
        handleNewKeywordButton={this.handleNewKeywordButton}
        handleAddNewKeyword={this.handleAddNewKeyword}
        handleAutocompleteChange={this.handleAutocompleteChange}
        handleSubmitQuestion={this.handleSubmitQuestion}
      />
    );
  }
}

NewQuestion.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default withRouter(NewQuestion);
