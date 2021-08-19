const { QuestionPublisher } = require('../config/redis');

async function publishQuestion(question) {
  console.debug(`Publishing user with username: ${question.title}`);
  const questionData = {
    title: question.title,
    description: question.description,
    askedOn: question.askedOn,
    askedBy: question.askedBy,
  };
  console.debug(questionData);
  QuestionPublisher.publish('Questions', JSON.stringify(questionData));
}

module.exports.publishQuestion = publishQuestion;
