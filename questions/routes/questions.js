const router = require('express').Router();

const { publishQuestion } = require('../controllers/QuestionPublisher');
const { buildQuestion } = require('../controllers/QuestionController');
const { addQuestionKeywords } = require('../controllers/QuestionKeywordController');
const { Question } = require('../models/Question');
const { QuestionKeyword } = require('../models/QuestionKeyword');
const utils = require('../lib/utils');

router.get('/', (req, res, next) => {
  Question.findAll()
    .then((questions) => {
      const retQuestions = questions.map((question) => {
        const questionData = {
          id: question.id,
          title: question.title,
          description: question.description,
          askedBy: question.askedBy,
          askedAt: question.createdAt,
        };
        return questionData;
      });

      res.status(200).json({
        success: true,
        questions: retQuestions,
      });
    });
});

router.get('/:questionId', (req, res, next) => {
  if (!utils.isOnlyNum(req.params.questionId)) {
    res.status(404).json({ success: false, msg: 'Question not found' });
  } else {
    Question.findOne({ where: { id: req.params.questionId } })
      .then((question) => {
        if (!question) {
          res.status(404).json({ success: false, msg: 'Question not found' });
        } else {
          QuestionKeyword.findAll({ where: { QuestionId: question.id } })
            .then((keywords) => {
              const retKeywords = keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
              }));
              const retData = {
                id: question.id,
                title: question.title,
                description: question.description,
                askedBy: question.askedBy,
                askedAt: question.createdAt,
                keywords: retKeywords,
              };
              res.status(200).json({
                success: true,
                question: retData,
              });
            });
        }
      });
  }
});

router.post('/new', utils.authMiddleware, (req, res, next) => {
  const username = req.jwt.sub;
  utils.getKeywordIds(req.body.keywords)
    .then((keywords) => {
      if (keywords.some((elem) => elem === null)) {
        res.status(401).json({
          success: false,
          msg: 'Provided keywords do not exist.',
        });
      } else {
        const newQuestion = buildQuestion(req.body, username);
        newQuestion.save()
          .then((question) => {
            addQuestionKeywords(question.id, keywords);
            publishQuestion(question, keywords);
            res.json({
              success: true,
              question_id: question.id,
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
