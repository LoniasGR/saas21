const { sequelize } = require('./connection');
const {
  User, UserQuestion, UserAnswer, checkTables,
} = require('./tables');

async function testDB() {
  try {
    await sequelize.authenticate();
    console.debug('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  checkTables();
}

module.exports = {
  testDB,
};
