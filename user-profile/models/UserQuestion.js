const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const {User } = require('./User');

const UserQuestion = sequelize.define('UserQuestion', {
  questionID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

UserQuestion.belongsTo(User);

module.exports.UserQuestion = UserQuestion;
