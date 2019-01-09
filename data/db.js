const knex = require('knex');
const knexConfig = require('../knexfile.js');

mobile.exports = knex(knexConfig.development);