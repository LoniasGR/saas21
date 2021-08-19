const router = require('express').Router();

const { publishQuestion } = require('../controllers/QuestionPublisher');
const { buildQuestion } = require('../controllers/QuestionController');
const { Question } = require('../models/Question');
const utils = require('../lib/utils');
const { buildKeyword, keywordAlreadyExists, getKeywords } = require('../controllers/KeywordController');
const { publishKeyword } = require('../controllers/KeywordPublisher');
const { route } = require('../../authentication/routes/users');

router.get('/', (req, res, next) => {

});

router.get('/:questionId', (req, res, next) => {

});

router.get('/keywords', (req, res, next) => {

});

router.get('/keywords/:keywordId', (req, res, next) => {

});

router.post('/new', utils.authMiddleware, (req, res, next) => {
  const username = req.jwt.sub;
  getKeywords(req.body.keywords)
    .then((keywords) => {
      console.log(keywords);
      if (keywords.some((elem) => elem === null)) {
        res.status(401).json({
          success: false,
          msg: 'Provided keywords do not exist.',
        });
      }
      const newQuestion = buildQuestion(req.body, username);
      newQuestion.save()
        .then((question) => {
          publishQuestion(question);
          res.json({
            success: true,
            question_id: question.id,
          });
          next();
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });
    });
});

router.post('/new-keyword', utils.authMiddleware, (req, res, next) => {
  keywordAlreadyExists(req.body.name).then((duplicate) => {
    if (duplicate) {
      res.status(401).json({
        success: false, msg: `${req.body.name} already exists`,
      });
    } else {
      const newKeyword = buildKeyword(req.body);
      newKeyword.save()
        .then((keyword) => {
          publishKeyword(keyword);
          res.json({
            success: true,
            name: keyword.name,
          });
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    }
  });
});

module.exports = router;
