/**
 * Module configures sequelize with environment variables.
 */

const config = require('.');
const { logger } = require('./logger');

/**
 * This little internal function simply sets up the Sequelize logging based on
 * the configuration of the environment. Sometimes it's a pain in the ass to
 * have a bunch of SQL spit out on the console, and this is a remedy.
 */
function sequelizeLogger(init) {
  if (init === 'true') return (x) => logger.info(x);
  return () => null;
}

module.exports = {
  development: {
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    host: config.database.host,
    dialect: 'postgres',
    logging: sequelizeLogger(config.sequelize.logging),
  },
  test: {
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    host: config.database.host,
    dialect: 'postgres',
    logging: sequelizeLogger(config.sequelize.logging),
  },
  production: {
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    host: config.database.host,
    dialect: 'postgres',
    logging: false,
  },
};
