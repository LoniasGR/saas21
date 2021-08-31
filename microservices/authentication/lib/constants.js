const fs = require('fs');
const path = require('path');

const pathToPrivKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8');
const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

module.exports.PRIV_KEY = PRIV_KEY;
module.exports.PUB_KEY = PUB_KEY;
