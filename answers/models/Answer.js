const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Answer = sequelize.define('Answer', {
  answerBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answerOf: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT('long'),
  },
});

module.exports.Answer = Answer;
