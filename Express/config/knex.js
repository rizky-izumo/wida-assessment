const Knex = require('knex');

const knexConfig = require('../knexfile');

// Initialize knex.
exports.knex = Knex(knexConfig);
