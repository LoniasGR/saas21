const { QuestionSubscriber } = require('../config/redis');
const { KeywordQuestion } = require('../models/KeywordQuestion');
const { getKeywords } = require('./KeywordController');

QuestionSubscriber.on('subscribe', (channel, count) => {
  console.debug(`Subscriber subscribed in channel '${channel}'`);
});

QuestionSubscriber.on('message', ((channel, message) => {
  console.debug(`Subscriber received message in channel '${channel}': ${message}`);
  const question = JSON.parse(message);
  getKeywords(question.keywords)
    .then((keywordList) => keywordList.filter((keyword) => keyword !== null))
    .then((keywords) => {
      keywords.map((keyword) => {
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
    });
}));
