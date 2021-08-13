const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { UserQuestion } = require('./UserQuestion');
const { UserAnswer } = require('./UserAnswer');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

User.Questions = User.hasMany(UserQuestion);
User.Answers = User.hasMany(UserAnswer);

module.exports.User = User;
