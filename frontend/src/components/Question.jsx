import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import QuestionView from '../views/Question';
import { keywordsAPIUrl, questionsAPIUrl } from '../constants';

class Question extends React.Component {
  constructor(props) {
    super(props);
    const { title, description, askedBy } = this.props;
    this.state = {
      title,
      description,
      askedBy,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    axios.get(`${questionsAPIUrl}/${id}`)
      .then(async (response) => {
        const keywordIds = response.data.question.keywords;
        const keywordNames = keywordIds.map((keyword) => (axios.get(`${keywordsAPIUrl}/${keyword.keywordId}`)
          .then((keywordResponse) => keywordResponse.data.keyword.name)));
        const promiseKeywords = await Promise.all(keywordNames);
        this.setState({
          keywords: promiseKeywords,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const {
      title, description, keywords, askedBy,
    } = this.state;

    return (
      <div>
        <QuestionView
          title={title}
          description={description}
          keywords={keywords}
          askedBy={askedBy}
        />
      </div>
    );
  }
}

Question.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  askedBy: PropTypes.string.isRequired,
};

export default Question;
