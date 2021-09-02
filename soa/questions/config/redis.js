const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

const redisOpts = {
  host: redisHost,
  port: redisPort,
};
const QuestionProducer = redis.createClient(redisOpts);

QuestionProducer.on('ready', () => {
  console.debug('QuestionProducer: Connected to Redis server successfully.');
});

module.exports.QuestionProducer = QuestionProducer;
