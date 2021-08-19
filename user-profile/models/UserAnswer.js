const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const {User } = require('./User');

const UserAnswer = sequelize.define('UserAnswer', {
  answerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

UserAnswer.belongsTo(User);

module.exports.UserAnswer = UserAnswer;
