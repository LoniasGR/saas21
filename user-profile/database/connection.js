const { Sequelize } = require('sequelize');

const database = process.env.DB_NAME || 'user_profile';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';
const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASS;
const dialect = 'postgres';

// Connect with postgres database
const sequelize = new Sequelize(database, username, password, {
  host: dbHost,
  port: dbPort,
  dialect,
});

module.exports = {
  sequelize,
  database,
  dbHost,
  dbPort,
  username,
  password,
  dialect,
};
