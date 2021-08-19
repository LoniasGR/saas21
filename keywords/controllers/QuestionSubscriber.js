const { QuestionSubscriber } = require('../config/redis');
const { KeywordQuestion } = require('../models/KeywordQuestion');

QuestionSubscriber.on('subscribe', (channel, count) => {
  console.debug(`Subscriber subscribed in channel '${channel}'`);
});

QuestionSubscriber.on('message', ((channel, message) => {
  console.debug(`Subscriber received message in channel '${channel}': ${message}`);
  const question = JSON.parse(message);
  question.keywords.map((keyword) => {
    const newKeywordQuestion = KeywordQuestion.build({
      questionId: question.id,
      keywordId: keyword,
    });
    newKeywordQuestion.save()
      .catch((err) => {
        console.log(err);
      });
    return 0;
  });
}));
