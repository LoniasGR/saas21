import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { userAPIUrl } from '../constants';
import ProfileView from '../views/Profile';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    const { username, token } = this.props;
    this.state = {
      username,
      token,
    };
  }

  componentDidMount() {
    const { username } = this.state;
    axios.get(`${userAPIUrl}/${username}`);
  }

  render() {
    return (
      <div>
        <ProfileView />
      </div>
    );
  }
}

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};
export default Profile;
