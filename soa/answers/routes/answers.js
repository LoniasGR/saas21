const router = require('express').Router();

const { buildAnswer } = require('../controllers/AnswerController');
const { Answer } = require('../models/Answer');
const utils = require('../lib/utils');

router.get('/:answerId', (req, res, next) => {
  if (!utils.isOnlyNum(req.params.answerId)) {
    res.status(404).json({ success: false, msg: 'Answer not found' });
  } else {
    Answer.findOne({ where: { id: req.params.answerId } })
      .then((answer) => {
        if (!answer) {
          res.status(404).json({ success: false, msg: 'Answer not found' });
        } else {
          const retData = {
            id: answer.id,
            answerBy: answer.answerBy,
            answerOf: answer.answerOf,
            text: answer.text,
          };
          res.status(200).json({
            success: true,
            answer: retData,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: err });
      });
  }
});

/* Get answers of a specific question */
router.get('/of/:questionId', (req, res, next) => {
  if (!utils.isOnlyNum(req.params.questionId)) {
    res.status(404).json({ success: false, msg: 'Question not found' });
  } else {
    utils.questionExists(req.params.questionId)
      .then((exists) => {
        if (!exists) {
          res.status(404).json({ success: false, msg: 'Question not found' });
        } else {
          Answer.findAll({ where: { answerOf: req.params.questionId } })
            .then((answers) => {
              const retAnswers = answers.map((answer) => {
                const retData = {
                  id: answer.id,
                  answerBy: answer.answerBy,
                  answerOf: answer.answerOf,
                  text: answer.text,
                };
                return retData;
              });
              res.status(200).json({ success: true, answers: retAnswers });
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: err });
      });
  }
});

router.post('/new', utils.authMiddleware, (req, res, next) => {
  const username = req.jwt.sub;
  utils.questionExists(req.body.questionId)
    .then((exists) => {
      if (exists) {
        if (req.body.text === undefined) {
          res.status(401).json({ success: false, msg: 'Answer text cannot be empty' });
        } else {
          const newAnswer = buildAnswer(req.body.questionId, username, req.body.text);
          newAnswer.save()
            .then((answer) => {
              res.status(200).json({ success: true, answerId: answer.id });
            });
        }
      } else {
        res.status(401).json({ success: false, msg: 'Related question does not exist' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, msg: err });
    });
});

module.exports = router;
