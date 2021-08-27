const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

const redisOpts = {
  host: redisHost,
  port: redisPort,
};
const AnswerPublisher = redis.createClient(redisOpts);

AnswerPublisher.on('ready', () => {
  console.debug('QuestionPublisher: Connected to Redis server successfully.');
});

module.exports.AnswerPublisher = AnswerPublisher;
