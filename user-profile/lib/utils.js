const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const { baseUrl } = require('../config/constants');

const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

/**
 * @param {*} req - The HTTP request.
 * @param {*} res - The HTTP response.
 * @param {*} next - The next middleware in the express pipeline
 * Express middleware for custom JWT authentication.
 */
function authMiddleware(req, res, next) {
  let tokenParts;
  try {
    tokenParts = req.headers.authorization.split(' ');
  } catch (err) {
    tokenParts = [null, null];
  }
  if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
    try {
      const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, { algorithms: ['RS256'] });
      req.jwt = verification;
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ success: false, msg: 'Unauthorized access' });
    }
  } else {
    res.status(401).json({ success: false, msg: 'Unauthorized access' });
  }
}

function getQuestionKeywords(keywords) {
  const retKeywords = keywords.map((keyword) => axios.get(`${baseUrl}/api/keywords/${keyword}`)
    .then((response) => response.data.keyword.name)
    .catch((err) => console.error(err)));
  return Promise.all(retKeywords);
}

function getUserQuestions(questions) {
  return Promise.all(questions.map((question) => axios.get(`${baseUrl}/api/questions/${question.questionId}`)
    .then(async (response) => {
      const keywordsIds = response.data.question.keywords.map((keyword) => (keyword.keywordId));
      const keywords = await getQuestionKeywords(keywordsIds);
      return ({
        id: response.data.question.id,
        title: response.data.question.title,
        description: response.data.question.description,
        keywords,
      });
    })
    .catch((err) => console.error(err))));
}

module.exports.authMiddleware = authMiddleware;
module.exports.getUserQuestions = getUserQuestions;
