const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const QuestionKeyword = sequelize.define('QuestionKeyword', {
  keywordId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports.QuestionKeyword = QuestionKeyword;
