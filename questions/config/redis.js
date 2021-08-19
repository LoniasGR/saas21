const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

const redisOpts = {
  host: redisHost,
  port: redisPort,
};
const QuestionPublisher = redis.createClient(redisOpts);
const KeywordPublisher = redis.createClient(redisOpts);

QuestionPublisher.on('ready', () => {
  console.debug('QuestionPublisher: Connected to Redis server successfully.');
});

KeywordPublisher.on('ready', () => {
  console.debug('KeywordPublisher: Connected to Redis server successfully.');
});

module.exports.QuestionPublisher = QuestionPublisher;
module.exports.KeywordPublisher = KeywordPublisher;
