import axios from 'axios';
import { authAPIUrl } from './constants';

export default function verifyToken(token) {
  return axios.get(`${authAPIUrl}/verify`, {
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      const { username } = response.data.user;
      const newToken = response.data.token;
      return { username, newToken };
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.debug(err);
      // eslint-disable-next-line
      console.debug(err.response);
      return { username: null, newToken: null };
    });
}
