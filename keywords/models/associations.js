const { KeywordQuestion } = require('./KeywordQuestion');
const { Keyword } = require('./Keyword');

Keyword.hasMany(KeywordQuestion);
KeywordQuestion.belongsTo(Keyword);
