const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { Question } = require('./Question');

const Keyword = sequelize.define('Keyword', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT('long'),
  },
});

Keyword.belongsToMany(Question, { through: 'Keyword_Question' });

module.exports.Keyword = Keyword;
