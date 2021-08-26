const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const { User } = require('../models/User');
const { PRIV_KEY, PUB_KEY } = require('./constants');
/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validPassword(password, hash, salt) {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
}

/**
 *
 * @param {*} password - The password string that the user inputs
 *  to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash
 * out of it.
 */
function genPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt,
    hash: genHash,
  };
}

/**
 *
 * @param {*} username - The username of the registering user.
 *
 * This function takes a username and returns a boolean if already
 * found in the database.
 */
async function userAlreadyExists(username, email) {
  const duplicateUsername = await User.findOne({ where: { username } });
  const duplicateEmail = await User.findOne({ where: { email } });
  if ((duplicateUsername === null) && (duplicateEmail === null)) {
    return { status: false, credential: null };
  }

  console.debug(`Duplicate user on registration of ${username}`);
  let credential;
  if (duplicateUsername) {
    credential = 'username';
    console.debug(`Duplicate user on registration with username ${username}`);
  } else {
    credential = 'email';
    console.debug(`Duplicate user on registration with email ${email}`);
  }
  return { status: true, credential };
}

/**
 * @param {*} user - The user object.
 * We need this to set the JWT `sub` payload property
 */
function issueJWT(username) {
  const expiresIn = '2w';

  const payload = {
    sub: username,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn, algorithm: 'RS256' });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}

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
      console.error(err);
      res.status(401).json({ success: false, msg: 'Unauthorized access' });
    }
  } else {
    res.status(401).json({ success: false, msg: 'Unauthorized access' });
  }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.authMiddleware = authMiddleware;
module.exports.userAlreadyExists = userAlreadyExists;
