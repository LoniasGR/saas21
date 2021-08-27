const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports.User = User;
