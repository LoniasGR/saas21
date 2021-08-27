const { UserPublisher } = require('../config/redis');

async function publishUser(user) {
  console.debug(`Publishing user with username: ${user.username}`);
  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  };
  console.debug(userData);
  UserPublisher.publish('Users', JSON.stringify(userData));
}

module.exports.publishUser = publishUser;
