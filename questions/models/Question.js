const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { Keyword } = require('./Keyword');

const Question = sequelize.define('Question', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT('long'),
  },
  askedOn: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  askedBy: {
    type: DataTypes.STRING,
  },
});

Question.belongsToMany(Keyword, { through: 'Keyword_Question' });
module.exports.Question = Question;
