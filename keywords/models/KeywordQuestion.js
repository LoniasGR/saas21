const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const KeywordQuestion = sequelize.define('KeywordQuestion', {
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports.KeywordQuestion = KeywordQuestion;
