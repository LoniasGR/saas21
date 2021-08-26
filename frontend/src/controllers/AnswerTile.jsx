import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { questionsAPIUrl, keywordsAPIUrl } from '../lib/constants';
import AnswerView from '../views/AnswerTile';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    const { text } = this.props;
    this.state = {
      questionTitle: '',
      askedBy: '',
      keywords: [],
      text,
    };
  }

  componentDidMount() {
    const { answerOf } = this.props;
    axios.get(`${questionsAPIUrl}/${answerOf}`)
      .then(async (response) => {
        const keywordIds = response.data.question.keywords;
        const keywordNames = keywordIds.map((keyword) => (axios.get(`${keywordsAPIUrl}/${keyword.keywordId}`)
          .then((keywordResponse) => keywordResponse.data.keyword.name)));
        const promiseKeywords = await Promise.all(keywordNames);
        this.setState({
          questionTitle: response.data.question.title,
          askedBy: response.data.question.askedBy,
          keywords: promiseKeywords,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const {
      questionTitle, askedBy, keywords, text,
    } = this.state;
    return (
      <div>
        <AnswerView
          questionTitle={questionTitle}
          askedBy={askedBy}
          keywords={keywords}
          text={text}
        />
      </div>
    );
  }
}

Answer.propTypes = {
  text: PropTypes.string.isRequired,
  answerOf: PropTypes.number.isRequired,
};

export default Answer;
