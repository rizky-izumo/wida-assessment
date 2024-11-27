// Update with your config settings.
const path = require('path');
const { types } = require('pg');
const { pgDb, pgUser, pgPass } = require('./config/vars');

const DATE_OID = 1082;
types.setTypeParser(DATE_OID, val => String(val));

const NUMERIC_OID = 1700;
types.setTypeParser(NUMERIC_OID, val => val * 1);

// import .env variables
require('dotenv-safe').config();

module.exports = {
  client: 'pg',
  connection: {
    database: pgDb,
    user: pgUser,
    password: pgPass
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
