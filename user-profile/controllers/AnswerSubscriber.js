const { AnswerSubscriber } = require('../config/redis');
const { User } = require('../models/User');
const { UserAnswer } = require('../models/UserAnswer');

AnswerSubscriber.on('subscribe', (channel, count) => {
  console.debug(`Subscriber subscribed in channel '${channel}'`);
});

AnswerSubscriber.on('message', ((channel, message) => {
  console.debug(`Subscriber received message in channel '${channel}': ${message}`);
  const answer = JSON.parse(message);
  User.findOne({ where: { username: answer.answerBy } })
    .then((user) => {
      const newUserAnswer = UserAnswer.build({
        answerId: answer.id,
        UserId: user.id,
      });
      newUserAnswer.save();
    })
    .catch((err) => {
      console.error(err);
    });
}));
