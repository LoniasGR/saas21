const { AnswerPublisher } = require('../config/redis');

async function publishAnswer(answer) {
  console.debug(`Publishing answer with title: ${answer.id}`);
  const answerData = {
    id: answer.id,
    answerBy: answer.answerBy,
    answerOf: answer.answerOf,
    text: answer.text,
  };
  console.debug(answerData);
  AnswerPublisher.publish('Answers', JSON.stringify(answerData));
}

module.exports.publishAnswer = publishAnswer;
