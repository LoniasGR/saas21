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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmitQuestion(event) {
    event.preventDefault();

    const { title, description } = this.state;
    axios.post(`${baseUrl}/api/questions/new`, { title, description });
  }

  render() {
    const { title, description } = this.state;
    return (
      <NewQuestionView
        title={title}
        description={description}
        handleChange={this.handleChange}
        handleSubmitQuestion={this.handleSubmitQuestion}
      />
    );
  }
}

export default NewQuestion;
