const { Answer } = require('../models/Answer');
const { User } = require('../models/User');

function buildAnswer(questionId, username, text) {
  User.findOne({ where: { username } })
    .then((user) => {
      const newAnswer = Answer.build(
        {
          UserId: user.id,
          QuestionId: questionId,
          text,
        },
      );
      return newAnswer;
    });
}

module.exports.buildAnswer = buildAnswer;
