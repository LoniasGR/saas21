const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

const redisOpts = {
  host: redisHost,
  port: redisPort,
};
const UserSubscriber = redis.createClient(redisOpts);

UserSubscriber.on('ready', () => {
  console.debug('Connected to Redis server successfully.');
});

module.exports.UserSubscriber = UserSubscriber;
