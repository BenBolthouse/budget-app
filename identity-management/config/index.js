/**
 * Module creates exported constants from environment variables.
 */

module.exports = {
  database: {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
  },
};
