const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

const redisOpts = {
  host: redisHost,
  port: redisPort,
};
const QuestionPublisher = redis.createClient(redisOpts);

QuestionPublisher.on('ready', () => {
  console.debug('Connected to Redis server successfully.');
});

module.exports.QuestionPublisher = QuestionPublisher;
