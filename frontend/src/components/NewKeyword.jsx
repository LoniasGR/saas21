import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import NewKeywordView from '../views/NewKeyword';
import { keywordsAPIUrl } from '../constants';

class NewKeyword extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      duplicateName: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitKeyword = this.handleSubmitKeyword.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmitKeyword(event) {
    event.preventDefault();
    const { handleAddNewKeyword, token } = this.props;
    const { name, description } = this.state;
    axios.post(`${keywordsAPIUrl}/new`, { name, description }, { headers: { Authorization: `${token}` } })
      .then(() => {
        handleAddNewKeyword();
      })
      .catch((err) => {
        console.error(err.response);
        if (err.response.data.msg === `${name} already exists`) { this.setState({ duplicateName: true }); }
      });
  }

  render() {
    const {
      name, description, duplicateName,
    } = this.state;
    const { handleKeywordCancellation } = this.props;
    return (
      <div>
        <NewKeywordView
          name={name}
          description={description}
          duplicateName={duplicateName}
          handleChange={this.handleChange}
          handleKeywordCancellation={handleKeywordCancellation}
          handleSubmitKeyword={this.handleSubmitKeyword}
        />
      </div>
    );
  }
}

NewKeyword.propTypes = {
  token: PropTypes.string.isRequired,
  handleAddNewKeyword: PropTypes.func.isRequired,
  handleKeywordCancellation: PropTypes.func.isRequired,

};
export default NewKeyword;
