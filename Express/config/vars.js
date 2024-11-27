require('dotenv').config();

module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
    pgDb: process.env.PG_DB,
    pgUser: process.env.PG_USER,
    pgPass: process.env.PG_PASS,
    pgConnUri: process.env.POSTGRES_CONN_URI
  };