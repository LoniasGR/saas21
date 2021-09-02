let baseUrl;

if (process.env.REACT_APP_BACKEND_TYPE === 'microservices') {
  baseUrl = 'https://microservices.lavdelas.me';
} else if (process.env.REACT_APP_BACKEND_TYPE === 'soa') {
  baseUrl = 'https://soa.lavdelas.me';
} else {
  baseUrl = 'https://microservices.lavdelas.me';
}

const APIUrl = `${baseUrl}/api`;
const questionsAPIUrl = `${APIUrl}/questions`;
const keywordsAPIUrl = `${APIUrl}/keywords`;
const answersAPIUrl = `${APIUrl}/answers`;
const authAPIUrl = `${APIUrl}/auth`;
const userAPIUrl = `${APIUrl}/users`;
const profileAPIUrl = `${APIUrl}/profile`;

module.exports.baseUrl = baseUrl;
module.exports.questionsAPIUrl = questionsAPIUrl;
module.exports.keywordsAPIUrl = keywordsAPIUrl;
module.exports.answersAPIUrl = answersAPIUrl;
module.exports.authAPIUrl = authAPIUrl;
module.exports.userAPIUrl = userAPIUrl;
module.exports.profileAPIUrl = profileAPIUrl;
