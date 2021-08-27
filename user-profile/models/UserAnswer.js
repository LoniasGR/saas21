const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserAnswer = sequelize.define('UserAnswer', {
  answerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports.UserAnswer = UserAnswer;
