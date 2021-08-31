const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserQuestion = sequelize.define('UserQuestion', {
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports.UserQuestion = UserQuestion;
