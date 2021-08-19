const { QuestionPublisher } = require('../config/redis');

async function publishQuestion(question) {
  console.debug(`Publishing question with title: ${question.title}`);
  const questionData = {
    id: question.id,
    title: question.title,
    description: question.description,
    askedBy: question.askedBy,
    createdAt: question.createdAt,
  };
  console.debug(questionData);
  QuestionPublisher.publish('Questions', JSON.stringify(questionData));
}

module.exports.publishQuestion = publishQuestion;
