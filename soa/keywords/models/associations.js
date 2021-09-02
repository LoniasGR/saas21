const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { Question } = require('./Question');
const { Keyword } = require('./Keyword');

const QuestionKeywords = sequelize.define('QuestionKeywords', {
  QuestionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Question,
      key: 'id',
    },
  },
  KeywordId: {
    type: DataTypes.INTEGER,
    references: {
      model: Keyword,
      key: 'id',
    },
  },
});

Question.belongsToMany(Keyword, { through: QuestionKeywords });
Keyword.belongsToMany(Question, { through: QuestionKeywords });

module.exports.QuestionKeywords = QuestionKeywords;
