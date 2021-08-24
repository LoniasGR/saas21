const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');
const baseUrl = 'https://microservices.lavdelas.me';

const alphanumeric = /^[\p{L}\p{N}]+$/u;
const onlyNumbers = /^\d+$/;

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
/**
 * @param {*} str - The string to test.
 * Returns true if string is Unicode alphanumeric.
 */
function isAlnum(str) {
  return (alphanumeric).test(str);
}

async function getKeywordIds(keywordsList) {
  const idList = keywordsList.map((keyword) => {
    const id = axios.get(`${baseUrl}/api/keywords/${keyword}`)
      .then((response) => {
        console.log(response.data);
        return response.data.keyword.id;
      })
      .catch((err) => { console.error(err); return null; });
    return id;
  });
  return Promise.all(idList);
}

function isOnlyNum(str) {
  return (onlyNumbers).test(str);
}

module.exports.authMiddleware = authMiddleware;
module.exports.isAlnum = isAlnum;
module.exports.getKeywordIds = getKeywordIds;
module.exports.isOnlyNum = isOnlyNum;
