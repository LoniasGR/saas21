const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

const redisOpts = {
  host: redisHost,
  port: redisPort,
};
const KeywordProducer = redis.createClient(redisOpts);
const QuestionConsumer = redis.createClient(redisOpts);
const PositionLogger = redis.createClient(redisOpts);

KeywordProducer.on('ready', () => {
  console.debug('KeywordProducer: Connected to Redis server successfully.');
});

QuestionConsumer.on('ready', () => {
  console.debug('QuestionConsumer: Connected to Redis server successfully.');
});

PositionLogger.on('ready', () => {
  console.debug('PositionLogger: Connected to Redis server successfully.');
});

module.exports.KeywordProducer = KeywordProducer;
module.exports.QuestionConsumer = QuestionConsumer;
module.exports.PositionLogger = PositionLogger;
