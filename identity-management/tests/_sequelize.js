/**
 * Module creates an instance of Sequelize class not tied to the test database.
 * This is crucial because there are fixtures in the test suites that drop and
 * create the test database during test runs. The sequelize instance obviously
 * cannot connect to a database that frequently drops.
 */
const { Sequelize } = require('sequelize');
const config = require('../config');

module.exports = new Sequelize('postgres', config.database.username, config.database.password, {
  dialect: 'postgres',
  logging: () => null,
});
