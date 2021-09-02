const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Answer = sequelize.define('Answer', {
  text: {
    type: DataTypes.TEXT('long'),
  },
});

module.exports.Answer = Answer;
