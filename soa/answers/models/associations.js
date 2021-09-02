const { User } = require('./User');
const { Question } = require('./Question');
const { Answer } = require('./Answer');

User.Questions = User.hasMany(Question);
User.Answers = User.hasMany(Answer);
Question.Answers = Question.hasMany(Answer);
Question.belongsTo(User);
Answer.belongsTo(User);
Answer.belongsTo(Question);
