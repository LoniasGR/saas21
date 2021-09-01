const { AnswerProducer } = require('../config/redis');

async function produceAnswer(answer) {
  console.debug(`Publishing answer with title: ${answer.id}`);
  const answerData = {
    id: answer.id,
    answerBy: answer.answerBy,
    answerOf: answer.answerOf,
    text: answer.text,
  };
  console.debug(answerData);
  AnswerProducer.xadd('Answers', '*',
    'Answer', JSON.stringify(answerData),
    (err) => {
      if (err) console.error(err);
    });
}

module.exports.produceAnswer = produceAnswer;
