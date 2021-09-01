const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

const redisOpts = {
  host: redisHost,
  port: redisPort,
};
const UserConsumer = redis.createClient(redisOpts);
const QuestionConsumer = redis.createClient(redisOpts);
const AnswerConsumer = redis.createClient(redisOpts);
const PositionLogger = redis.createClient(redisOpts);

UserConsumer.on('ready', () => {
  console.debug('UserConsumer: Connected to Redis server successfully.');
});

QuestionConsumer.on('ready', () => {
  console.debug('QuestionConsumer: Connected to Redis server successfully.');
});

AnswerConsumer.on('ready', () => {
  console.debug('AnswerConsumer: Connected to Redis server successfully.');
});

PositionLogger.on('ready', () => {
  console.debug('PositionLogger: Connected to Redis server successfully.');
});

module.exports.UserConsumer = UserConsumer;
module.exports.QuestionConsumer = QuestionConsumer;
module.exports.AnswerConsumer = AnswerConsumer;
module.exports.PositionLogger = PositionLogger;
