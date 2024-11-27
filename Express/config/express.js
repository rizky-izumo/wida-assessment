const express = require('express');
const { Model } = require('objection');
const { knex } = require('./knex');
const bodyParser = require('body-parser');
const routes = require('../api/routes/');
const error = require('../api/middlewares/error');

// Give the knex object to  objection.
Model.knex(knex);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('', routes);
app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

module.exports = app;