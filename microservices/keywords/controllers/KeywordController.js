const { Keyword } = require('../models/Keyword');

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

module.exports.buildKeyword = buildKeyword;
module.exports.keywordAlreadyExists = keywordAlreadyExists;
