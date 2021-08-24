const router = require('express').Router();
const { User } = require('../models/User');
const { UserQuestion } = require('../models/UserQuestion');

const utils = require('../lib/utils');

/* GET users listing. */
router.get('/:userName', utils.authMiddleware, (req, res, next) => {
  const profile = req.params.userName;
  const username = req.jwt.sub;
  console.log(username);

  if (profile === username) {
    // TODO
    res.status(200).json({ success: true });
  } else {
    User.findOne({ where: { username } })
      .then((user) => {
        if (!user) {
          res.status(401).json({ success: false, msg: 'User not found' });
        } else {
          UserQuestion.findAll({ where: { userId: user.id } })
            .then((questions) => {
              res.status(200).json({ success: true, user, questions });
            });
        }
      })
      .catch((err) => console.error(err));
  }
});

module.exports = router;
