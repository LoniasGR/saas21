const router = require('express').Router();

const utils = require('../lib/utils');
const { publishUser } = require('../models/UserPublisher');
const { buildUser } = require('../controllers/UserController');
const { User } = require('../models/User');

router.post('/login', (req, res, next) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, msg: 'User not found' });
      }
      const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
      if (isValid) {
        const tokenObject = utils.issueJWT(user);
        res.status(200).json({
          success: true, user, token: tokenObject.token, expiresIn: tokenObject.expires,
        });
      } else {
        res.status(401).json({ success: false, msg: 'Wrong Password!' });
      }
    }).catch((err) => next(err));
});

router.post('/register', (req, res, next) => {
  const saltHash = utils.genPassword(req.body.password);

  const { salt } = saltHash;
  const { hash } = saltHash;

  utils.userAlreadyExists(req.body.username)
    .then((duplicate) => {
      if (duplicate) {
        res.status(401).json({
          success: false, msg: 'User already exists',
        });
      } else {
        const newUser = buildUser(req.body, hash, salt);
        newUser.save()
          .then((user) => {
            publishUser(user);
            const jwt = utils.issueJWT(user);
            res.json({
              success: true, user, token: jwt.token, expiresIn: jwt.expires,
            });
          })
          .catch((err) => {
            console.log(err);
            next(err);
          });
      }
    });
});

module.exports = router;
