const { Sequelize } = require('sequelize');

const database = process.env.DB_NAME || 'users';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';
const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASS;

// Connect with postgres database
const sequelize = new Sequelize(database, username, password, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
});

async function testDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = testDB;
