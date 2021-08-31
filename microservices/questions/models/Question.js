const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Question = sequelize.define('Question', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT('long'),
  },
  askedBy: {
    type: DataTypes.STRING,
  },
});

module.exports.Question = Question;
