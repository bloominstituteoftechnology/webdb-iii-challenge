const config = require('../knexfile'); //Q? What does this do?

const knex = require('knex');

module.exports = knex(config.development);