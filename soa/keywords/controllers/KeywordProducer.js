const { KeywordProducer } = require('../config/redis');

async function publishKeyword(keyword) {
  console.debug(`Publishing keyword with name: ${keyword.name}`);
  const keywordData = {
    id: keyword.id,
    title: keyword.name,
    description: keyword.description,
  };
  console.debug(keywordData);
  KeywordProducer.xadd('soa_Keywords', '*',
    'Keyword', JSON.stringify(keywordData),
    (err) => {
      if (err) console.error(err);
    });
}

module.exports.publishKeyword = publishKeyword;
