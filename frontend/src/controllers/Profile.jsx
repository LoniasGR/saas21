import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { profileAPIUrl } from '../lib/constants';
import ProfileView from '../views/Profile';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    const { token } = this.props;
    this.state = {
      token,
      username: '',
      firstName: '',
      lastName: '',
      questions: [],
    };
  }

  componentDidMount() {
    const { token } = this.state;
    axios.get(`${profileAPIUrl}/`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        const { user, questions } = response.data;
        this.setState({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          questions,
        });
      });
  }

  render() {
    const {
      username, firstName, lastName, questions,
    } = this.state;
    return (
      <div>
        <ProfileView
          username={username}
          firstName={firstName}
          lastName={lastName}
          questions={questions}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  token: PropTypes.string.isRequired,
};
export default Profile;
