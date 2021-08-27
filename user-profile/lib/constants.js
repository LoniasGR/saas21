const fs = require('fs');
const path = require('path');

const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

const baseUrl = 'https://microservices.lavdelas.me';
const APIUrl = `${baseUrl}/api`;
const questionsAPIUrl = `${APIUrl}/questions`;
const answersAPIUrl = `${APIUrl}/answers`;
const keywordsAPIUrl = `${APIUrl}/keywords`;

module.exports.questionsAPIUrl = questionsAPIUrl;
module.exports.answersAPIUrl = answersAPIUrl;
module.exports.keywordsAPIUrl = keywordsAPIUrl;
module.exports.PUB_KEY = PUB_KEY;
