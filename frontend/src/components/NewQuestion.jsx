import React from 'react';
import axios from 'axios';

import NewQuestionView from '../views/NewQuestion';
import { baseUrl } from '../constants';

class NewQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      keywords: [],
      possibleKeywords: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
    this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
  }

  componentDidMount() {
    axios.get(`${baseUrl}/api/keywords/`)
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

  handleSubmitQuestion(event) {
    event.preventDefault();

    const { title, description, keywords } = this.state;
    axios.post(`${baseUrl}/api/questions/new`, { title, description, keywords })
    // eslint-disable-next-line
      .catch((err) => { console.error(err); });
  }

  render() {
    const {
      title, description, keywords, possibleKeywords,
    } = this.state;
    return (
      <NewQuestionView
        title={title}
        description={description}
        keywords={keywords}
        possibleKeywords={possibleKeywords}
        handleChange={this.handleChange}
        handleAutocompleteChange={this.handleAutocompleteChange}
        handleSubmitQuestion={this.handleSubmitQuestion}
      />
    );
  }
}

export default NewQuestion;
