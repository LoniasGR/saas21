const fs = require('fs');
const path = require('path');

const baseUrl = 'https://soa.lavdelas.me';
const APIUrl = `${baseUrl}/api`;
const questionsAPIUrl = `${APIUrl}/questions`;
const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

const alphanumeric = /^[\p{L}\p{N}]+$/u;
const onlyNumbers = /^\d+$/;

module.exports.questionsAPIUrl = questionsAPIUrl;
module.exports.PUB_KEY = PUB_KEY;
module.exports.alphanumeric = alphanumeric;
module.exports.onlyNumbers = onlyNumbers;
