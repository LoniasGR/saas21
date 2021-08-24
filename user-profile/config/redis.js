const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

const redisOpts = {
  host: redisHost,
  port: redisPort,
};
const UserSubscriber = redis.createClient(redisOpts);
const QuestionSubscriber = redis.createClient(redisOpts);

UserSubscriber.on('ready', () => {
  console.debug('Connected to Redis server successfully.');
});

QuestionSubscriber.on('ready', () => {
  console.debug('QuestionSubscriber: Connected to Redis server successfully.');
});

module.exports.UserSubscriber = UserSubscriber;
module.exports.QuestionSubscriber = QuestionSubscriber;
