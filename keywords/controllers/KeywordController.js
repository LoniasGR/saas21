const { Keyword } = require('../models/Keyword');
const utils = require('../lib/utils');

function buildKeyword(data) {
  const newKeyword = Keyword.build(
    {
      name: data.name,
      description: data.description,
    },
  );
  return newKeyword;
}

async function keywordAlreadyExists(name) {
  const duplicateKeyword = await Keyword.findOne({ where: { name } });
  if (duplicateKeyword === null) { return false; }

  console.debug(`Duplicate keyword named ${name}`);
  return true;
}

function getKeywords(keywordsString) {
  const keywordsNames = keywordsString.split(', ');
  const keywords = keywordsNames.map(async (keywordName) => {
    if (utils.isAlnum(keywordName)) {
      const newKeyword = Keyword.findOne({ where: { name: keywordName } })
        .then((keyword) => {
          if (!keyword) {
            return null;
          }
          return keyword.id;
        })
        .catch((err) => {
          console.error(err);
          return null;
        });
      return newKeyword;
    }

    return null;
  });
  return Promise.all(keywords);
}

module.exports.buildKeyword = buildKeyword;
module.exports.getKeywords = getKeywords;
module.exports.keywordAlreadyExists = keywordAlreadyExists;
