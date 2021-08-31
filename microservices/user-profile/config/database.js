const { Sequelize } = require('sequelize');

/**
 * -------------- DATABASE ----------------
*/

let sequelize;
if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/user_profile.sqlite',
  });
} else {
  const database = process.env.DB_NAME || 'user_profile';
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = process.env.DB_PORT || '5432';
  const username = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASS;
  const dialect = 'postgres';

  sequelize = new Sequelize(database, username, password, {
    host: dbHost,
    port: dbPort,
    dialect,
  });
}

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

async function checkTables() {
  await sequelize.sync();
  console.debug('All models are synchronized.');
}

module.exports.sequelize = sequelize;
module.exports.checkTables = checkTables;
