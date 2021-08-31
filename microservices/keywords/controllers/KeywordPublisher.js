const { KeywordPublisher } = require('../config/redis');

async function publishKeyword(keyword) {
  console.debug(`Publishing keyword with name: ${keyword.name}`);
  const keywordData = {
    id: keyword.id,
    title: keyword.name,
    description: keyword.description,
  };
  console.debug(keywordData);
  KeywordPublisher.publish('Keywords', JSON.stringify(keywordData));
}

module.exports.publishKeyword = publishKeyword;
