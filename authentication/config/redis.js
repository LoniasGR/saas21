const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

const redisOpts = {
  host: redisHost,
  port: redisPort,
};
const UserPublisher = redis.createClient(redisOpts);

UserPublisher.on('ready', () => {
  console.debug('Connected to Redis server successfully.');
});

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
