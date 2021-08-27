const { Question } = require('../models/Question');

function buildQuestion(data, username) {
  const newQuestion = Question.build(
    {
      title: data.title,
      description: data.description,
      askedBy: username,
    },
  );
  return newQuestion;
}

module.exports.buildQuestion = buildQuestion;
