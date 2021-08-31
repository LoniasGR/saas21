const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Keyword = sequelize.define('Keyword', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports.Keyword = Keyword;
