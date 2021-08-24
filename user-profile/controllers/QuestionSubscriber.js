const { QuestionSubscriber } = require('../config/redis');
const { UserQuestion } = require('../models/UserQuestion');

QuestionSubscriber.on('subscribe', (channel, count) => {
  console.debug(`Subscriber subscribed in channel '${channel}'`);
});

QuestionSubscriber.on('message', ((channel, message) => {
  console.debug(`Subscriber received message in channel '${channel}': ${message}`);
  const question = JSON.parse(message);
  const newUserQuestion = UserQuestion.build({
    questionId: question.id,
    UserId: question.askedBy,
  });
  newUserQuestion.save()
    .catch((err) => {
      console.log(err);
    });
}));
