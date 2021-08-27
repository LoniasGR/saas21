import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import QuestionPageView from '../views/QuestionPage';
import { questionsAPIUrl, keywordsAPIUrl } from '../lib/constants';
import { getAnswersOfQuestion } from '../lib/utils';

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('id');
    this.state = {
      id,
      title: '',
      description: '',
      askedBy: '',
      keywords: [],
      answers: [],
    };
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

  render() {
    const {
      title, description, askedBy, keywords, answers,
    } = this.state;
    return (
      <div>
        <QuestionPageView
          title={title}
          description={description}
          askedBy={askedBy}
          keywords={keywords}
          answers={answers}
        />
      </div>
    );
  }
}

QuestionPage.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default QuestionPage;
