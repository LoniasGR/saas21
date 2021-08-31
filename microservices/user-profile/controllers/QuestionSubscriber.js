const { QuestionSubscriber } = require('../config/redis');
const { UserQuestion } = require('../models/UserQuestion');
const { User } = require('../models/User');

QuestionSubscriber.on('subscribe', (channel, count) => {
  console.debug(`Subscriber subscribed in channel '${channel}'`);
});

QuestionSubscriber.on('message', ((channel, message) => {
  console.debug(`Subscriber received message in channel '${channel}': ${message}`);
  const question = JSON.parse(message);
  User.findOne({ where: { username: question.askedBy } })
    .then((user) => {
      const newUserQuestion = UserQuestion.build({
        questionId: question.id,
        UserId: user.id,
      });
      newUserQuestion.save();
    })
    .catch((err) => {
      console.log(err);
    });
}));
