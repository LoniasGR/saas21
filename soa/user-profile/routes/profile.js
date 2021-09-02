const router = require('express').Router();
const { User } = require('../models/User');
const { Question } = require('../models/Question');
const { Answer } = require('../models/Answer');

const utils = require('../lib/utils');

router.get('/', utils.authMiddleware, (req, res, next) => {
  const username = req.jwt.sub;

  User.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, msg: 'User not found' });
      } else {
        const retUser = {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        Question.findAll({ where: { UserId: user.id } })
          .then((questions) => {
            utils.getUserQuestions(questions)
              .then((respQuestions) => {
                Answer.findAll({ where: { UserId: user.id } })
                  .then(async (answers) => {
                    const respAnswers = await utils.getUserAnswers(answers);
                    res.status(200).json(
                      {
                        success: true,
                        user: retUser,
                        questions: respQuestions,
                        answers: respAnswers,
                      },
                    );
                  });
              });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(404);
    });
});
module.exports = router;
