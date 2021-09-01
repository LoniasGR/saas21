const { UserProducer } = require('../config/redis');

async function produceUser(user) {
  console.debug(`Publishing user with username: ${user.username}`);
  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  };
  console.debug(userData);
  UserProducer.xadd('Users', '*',
    'User', JSON.stringify(userData),
    (err) => {
      if (err) console.error(err);
    });
}

module.exports.produceUser = produceUser;
