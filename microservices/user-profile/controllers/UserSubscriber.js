const { UserSubscriber } = require('../config/redis');
const { User } = require('../models/User');

UserSubscriber.on('subscribe', (channel, count) => {
  console.debug(`Subscriber subscribed in channel '${channel}'`);
});

UserSubscriber.on('message', ((channel, message) => {
  console.log(`Subscriber received message in channel '${channel}': ${message}`);
  const user = JSON.parse(message);
  const newUser = User.build({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
  });
  newUser.save()
    .catch((err) => {
      console.log(err);
    });
}));
