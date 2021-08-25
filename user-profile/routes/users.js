const router = require('express').Router();
const { User } = require('../models/User');
const { UserQuestion } = require('../models/UserQuestion');

const utils = require('../lib/utils');

/* GET users listing. */
router.get('/:userName', (req, res, next) => {
  const profile = req.params.userName;

  User.findOne({ where: { username: profile } })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, msg: 'User not found' });
      } else {
        const retUser = {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        UserQuestion.findAll({ where: { UserId: user.id } })
          .then((questions) => {
            utils.getUserQuestions(questions)
              .then((respQuestions) => {
                res.status(200).json(
                  { success: true, user: retUser, questions: respQuestions },
                );
              });
          });
      }
    })
    .catch((err) => console.error(err));
});

module.exports = router;
