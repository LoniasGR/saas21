const async = require('async');
const { AnswerConsumer, PositionLogger } = require('../config/redis');
const { User } = require('../models/User');
const { UserAnswer } = require('../models/UserAnswer');

const positionKey = 'ms_user_answers_PositionLogger';
const STREAM_ID = 'Answers';

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
      AnswerConsumer.xread('BLOCK', 0, 'STREAMS', STREAM_ID, queueStart, (err, stream) => {
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
          const answer = JSON.parse(message[1]);
          PositionLogger.set(positionKey, id, (error, reply) => {
            if (error) console.error(error);
            if (reply) console.debug(`Saving key: ${reply}`);
          });
          User.findOne({ where: { username: answer.answerBy } })
            .then((user) => {
              const newUserAnswer = UserAnswer.build({
                answerId: answer.id,
                UserId: user.id,
              });
              newUserAnswer.save();
            })
            .catch((e) => {
              console.error(e);
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
