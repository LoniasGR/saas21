const async = require('async');

const { QuestionConsumer, PositionLogger } = require('../config/redis');
const { KeywordQuestion } = require('../models/KeywordQuestion');

const positionKey = 'ms_keywords_PositionLogger';
const STREAM_ID = 'Questions';

async function coldStart() {
  const queueStart = PositionLogger.get(positionKey,
    (err, reply) => {
      if (err) {
        console.error(err);
        return '$';
      }
      return reply;
    });
  if (queueStart === ''
      || queueStart === undefined
      || queueStart === null
      || queueStart === false) {
    return '$';
  }
  return queueStart;
}

async function consume() {
  let queueStart = await coldStart();
  async.forever(
    (next) => {
      QuestionConsumer.xread('BLOCK', 0, 'STREAMS', STREAM_ID, queueStart, (err, stream) => {
        if (err) {
          console.error(err);
          next(err);
        }

        if (stream) {
          const [streams] = stream;
          const [channel, response] = streams;
          const [[id, message]] = response;
          queueStart = id;
          console.debug(
            `Consumer received message with id ${id} in channel '${channel}': ${message[1]}`,
          );
          const question = JSON.parse(message[1]);
          PositionLogger.set(positionKey, id, (error, reply) => {
            if (error) console.error(error);
            if (reply) console.debug(`Saving key: ${reply}`);
          });
          question.keywords.map((keyword) => {
            const newKeywordQuestion = KeywordQuestion.build({
              questionId: question.id,
              keywordId: keyword,
            });
            return newKeywordQuestion.save()
              .catch((er) => {
                console.log(er);
              });
          });
        } else {
        // No message in the consumer buffer
          console.debug('The queue is forever blocking, something went wrong.');
        }

        next();
      });
    },
    (err) => {
      console.error(` ERROR ${err}`);
    },
  );
}

consume();
