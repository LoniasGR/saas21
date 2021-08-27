import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { questionsAPIUrl, keywordsAPIUrl } from '../lib/constants';
import AnswerView from '../views/AnswerTile';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    const { text } = this.props;
    this.state = {
      questionId: '',
      questionTitle: '',
      askedBy: '',
      keywords: [],
      text,
    };
    this.handleClick = this.handleClick.bind(this);
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
          questionId: response.data.question.id,
          questionTitle: response.data.question.title,
          askedBy: response.data.question.askedBy,
          keywords: promiseKeywords,
        });
      })
      .catch((err) => console.error(err));
  }

  handleClick(event) {
    event.preventDefault();
    const { history } = this.props;
    const { questionId } = this.state;
    history.push(`/question/?id=${questionId}`);
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
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

Answer.propTypes = {
  text: PropTypes.string.isRequired,
  answerOf: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Answer);
