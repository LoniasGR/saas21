const { QuestionProducer } = require('../config/redis');

async function produceQuestion(question, keywords) {
  console.debug(`Publishing question with title: ${question.title}`);
  const questionData = {
    id: question.id,
    title: question.title,
    description: question.description,
    askedBy: question.askedBy,
    createdAt: question.createdAt,
    keywords,
  };
  console.debug(questionData);
  QuestionProducer.xadd('Questions', '*',
    'Question', JSON.stringify(questionData),
    (err) => {
      if (err) console.error(err);
    });
}

module.exports.produceQuestion = produceQuestion;
