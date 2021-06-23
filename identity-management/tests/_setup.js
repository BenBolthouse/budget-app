const { Sequelize, DataTypes } = require('sequelize');

const { logger } = require('../config/logger');
const { sequelize } = require('../models');
const config = require('../config');

const sequelizeAdmin = new Sequelize('postgres', config.database.username, config.database.password, {
  dialect: 'postgres',
  logging: () => null,
});

const usersTableMigration = require('../migrations/00001-create-users-table');
const rolesTableMigration = require('../migrations/00002-create-roles-table');
const claimsTableMigration = require('../migrations/00003-create-claims-table');

let setupHasRun = false;

async function setup() {
  if (setupHasRun) return logger.info('Setup already complete, skipping...');

  const adminQueryInterface = sequelizeAdmin.getQueryInterface();
  const testQueryInterface = sequelize.getQueryInterface();
  const databaseName = config.database.name;

  // The following will initially try to drop the database if it exists.
  try {
    logger.info('Removing existing database...');

    await adminQueryInterface.dropDatabase(databaseName);

    logger.info('Database removed.');
  }
  catch (e) {
    logger.warn(e);
  }

  // Then the second step to the database setup is creating a database,
  // requiring two separate try/catches. The above try/catch will catch if the
  // database does not already exist.
  try {
    logger.info('Creating test database...');

    await adminQueryInterface.createDatabase(databaseName);

    logger.info('Database created.');
  }
  catch (e) {
    logger.error(e);
  }

  // The following runs a list of migrations. Note that while migrations
  // upgrades run here, downgrades are not necessary due to deletion of the test
  // database on teardown.
  try {
    logger.info('Running migrations...');

    await usersTableMigration.up(testQueryInterface, DataTypes);
    await rolesTableMigration.up(testQueryInterface, DataTypes);
    await claimsTableMigration.up(testQueryInterface, DataTypes);

    logger.info('Migrations complete.');
  }
  catch (e) {
    logger.error(e);
  }

  // This final step ensures that we don't accidentally try to create the
  // database twice or run migrations twice.
  setupHasRun = true;

  return true;
}

module.exports = { setup };
