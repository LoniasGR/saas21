const router = require('express').Router();

const utils = require('../lib/utils');
const { publishUser } = require('../controllers/UserPublisher');
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
          success: true,
          user: { username: user.username },
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res.status(401).json({ success: false, msg: 'Wrong password' });
      }
    }).catch((err) => next(err));
});

router.post('/register', (req, res, next) => {
  const saltHash = utils.genPassword(req.body.password);

  const { salt } = saltHash;
  const { hash } = saltHash;

  utils.userAlreadyExists(req.body.username, req.body.email)
    .then((duplicate) => {
      if (duplicate.status) {
        const { credential } = duplicate;
        res.status(401).json({
          success: false, msg: `${credential} already exists`,
        });
      } else {
        const newUser = buildUser(req.body, hash, salt);
        newUser.save()
          .then((user) => {
            publishUser(user);
            const jwt = utils.issueJWT(user.username);
            res.json({
              success: true,
              user: { username: user.username },
              token: jwt.token,
              expiresIn: jwt.expires,
            });
          })
          .catch((err) => {
            console.log(err);
            next(err);
          });
      }
    });
});

// Verify and renew the JWT
router.get('/verify', utils.authMiddleware, (req, res, next) => {
  const { username } = req.jwt.sub;
  User.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, msg: 'User not found' });
      } else {
        const tokenObject = utils.issueJWT(user.username);
        res.status(200).json({
          success: true,
          user: { username: user.username },
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      }
    });
});

module.exports = router;
