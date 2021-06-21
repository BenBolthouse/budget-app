/**
 * Module configures sequelize with environment variables.
 */

const config = require('.');

module.exports = {
  development: {
    username: config.database.user,
    password: config.database.password,
    database: config.database.name,
    host: config.database.host,
    dialect: 'postgres',
  },
  test: {
    username: config.database.user,
    password: config.database.password,
    database: config.database.name,
    host: config.database.host,
    dialect: 'postgres',
  },
  production: {
    username: config.database.user,
    password: config.database.password,
    database: config.database.name,
    host: config.database.host,
    dialect: 'postgres',
  },
};
