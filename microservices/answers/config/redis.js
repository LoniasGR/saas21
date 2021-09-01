const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

const redisOpts = {
  host: redisHost,
  port: redisPort,
};
const AnswerProducer = redis.createClient(redisOpts);

AnswerProducer.on('ready', () => {
  console.debug('AnswerProducer: Connected to Redis server successfully.');
});

module.exports.AnswerProducer = AnswerProducer;
