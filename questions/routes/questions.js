const router = require('express').Router();

const { publishQuestion } = require('../controllers/QuestionPublisher');
const { buildQuestion } = require('../controllers/QuestionController');
const { Question } = require('../models/Question');
const utils = require('../lib/utils');

router.get('/', (req, res, next) => {

});

router.get('/:questionId', (req, res, next) => {

});

router.put('/new', utils.authMiddleware, (req, res, next) => {
  const username = req.jwt.sub;
  const newQuestion = buildQuestion(req.body, username);
});
