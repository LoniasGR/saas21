const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hash: {
    type: DataTypes.STRING,
  },
  salt: {
    type: DataTypes.STRING,
  },
});

async function checkTables() {
  await sequelize.sync();
  console.debug('All models are synchronized.');
}

checkTables();

module.exports = { User };
