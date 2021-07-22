const { DataTypes } = require('sequelize');

const { sequelize } = require('./connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const UserQuestion = sequelize.define('UserQuestion', {
  questionID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const UserAnswer = sequelize.define('UserAnswer', {
  answerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.Questions = User.hasMany(UserQuestion);
User.Answers = User.hasMany(UserAnswer);

async function checkTables() {
  await sequelize.sync();
  console.debug('All models are synchronized.');
}

module.exports = {
  User,
  UserQuestion,
  UserAnswer,
  checkTables,
};
