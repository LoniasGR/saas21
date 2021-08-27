const jsonwebtoken = require('jsonwebtoken');
const axios = require('axios');
const constants = require('./constants');

/**
 * @param {*} req - The HTTP request.
 * @param {*} res - The HTTP response.
 * @param {*} next - The next middleware in the express pipeline
 * Express middleware for custom JWT authentication.
 */
function authMiddleware(req, res, next) {
  const tokenParts = req.headers.authorization.split(' ');

  if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
    try {
      const verification = jsonwebtoken.verify(tokenParts[1], constants.PUB_KEY, { algorithms: ['RS256'] });
      req.jwt = verification;
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ success: false, msg: 'Unauthorized access' });
    }
  } else {
    res.status(401).json({ success: false, msg: 'Unauthorized access' });
  }
}

function questionExists(questionId) {
  return axios.get(`${constants.questionsAPIUrl}/${questionId}`)
    .then((response) => {
      console.log(response.data);
      return true;
    })
    .catch((err) => {
      console.error(err.message);
      return false;
    });
}

function isOnlyNum(str) {
  return (constants.onlyNumbers).test(str);
}

module.exports.authMiddleware = authMiddleware;
module.exports.questionExists = questionExists;
module.exports.isOnlyNum = isOnlyNum;
