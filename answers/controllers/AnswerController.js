const { Answer } = require('../models/Answer');

function buildAnswer(questionId, username, text) {
  const newAnswer = Answer.build(
    {
      answerBy: username,
      answerOf: questionId,
      text,
    },
  );
  return newAnswer;
}

module.exports.buildAnswer = buildAnswer;
