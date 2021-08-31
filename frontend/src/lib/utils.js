import axios from 'axios';
import { authAPIUrl, answersAPIUrl } from './constants';

export async function verifyToken(token) {
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

export async function getAnswersOfQuestion(questionId) {
  return axios.get(`${answersAPIUrl}/of/${questionId}`)
    .then((response) => response.data.answers.map((answer) => ({
      id: answer.id,
      text: answer.text,
      answerBy: answer.answerBy,
    })))
    .catch((err) => console.error(err));
}
