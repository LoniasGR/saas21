const { User } = require('./User');
const { UserQuestion } = require('./UserQuestion');
const { UserAnswer } = require('./UserAnswer');

User.Questions = User.hasMany(UserQuestion);
User.Answers = User.hasMany(UserAnswer);
UserAnswer.belongsTo(User);
UserQuestion.belongsTo(User);
