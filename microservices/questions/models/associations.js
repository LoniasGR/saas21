const { QuestionKeyword } = require('./QuestionKeyword');
const { Question } = require('./Question');

Question.hasMany(QuestionKeyword);
QuestionKeyword.belongsTo(Question);
