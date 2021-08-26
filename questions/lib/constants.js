const fs = require('fs');
const path = require('path');

const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');
const baseUrl = 'https://microservices.lavdelas.me';

const alphanumeric = /^[\p{L}\p{N}]+$/u;
const onlyNumbers = /^\d+$/;

module.exports.PUB_KEY = PUB_KEY;
module.exports.baseUrl = baseUrl;
module.exports.alphanumeric = alphanumeric;
module.exports.onlyNumbers = onlyNumbers;
