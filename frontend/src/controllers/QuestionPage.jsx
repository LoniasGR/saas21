import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import QuestionPageView from '../views/QuestionPage';
import { questionsAPIUrl, keywordsAPIUrl, answersAPIUrl } from '../lib/constants';
import { getAnswersOfQuestion } from '../lib/utils';

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    const { location, token, loggedIn } = this.props;
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('id');
    this.state = {
      loggedIn,
      token,
      id,
      title: '',
      description: '',
      askedBy: '',
      keywords: [],
      answers: [],
      newAnswerText: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitNewAnswer = this.submitNewAnswer.bind(this);
  }

  componentDidMount() {
    const { id } = this.state;
    axios.get(`${questionsAPIUrl}/${id}`)
      .then(async (response) => {
        const keywordIds = response.data.question.keywords;
        const keywordNames = keywordIds.map((keyword) => (axios.get(`${keywordsAPIUrl}/${keyword.keywordId}`)
          .then((keywordResponse) => keywordResponse.data.keyword.name)));
        const answers = await getAnswersOfQuestion(id);
        const promiseKeywords = await Promise.all(keywordNames);
        this.setState({
          title: response.data.question.title,
          description: response.data.question.description,
          askedBy: response.data.question.askedBy,
          keywords: promiseKeywords,
          answers,
        });
      })
      .catch((err) => console.error(err));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitNewAnswer(event) {
    event.preventDefault();

    const { id, token, newAnswerText } = this.state;

    axios.post(`${answersAPIUrl}/new`,
      { questionId: id, text: newAnswerText },
      {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(async () => {
        const answers = await getAnswersOfQuestion(id);
        this.setState({ answers, newAnswerText: '' });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const {
      loggedIn,
      title,
      description,
      askedBy,
      keywords,
      answers,
      newAnswerText,
    } = this.state;
    return (
      <div>
        <QuestionPageView
          loggedIn={loggedIn}
          title={title}
          description={description}
          askedBy={askedBy}
          keywords={keywords}
          answers={answers}
          newAnswerText={newAnswerText}
          handleChange={this.handleChange}
          submitNewAnswer={this.submitNewAnswer}
        />
      </div>
    );
  }
}

QuestionPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

QuestionPage.defaultProps = {
  token: '',
};

export default withRouter(QuestionPage);
