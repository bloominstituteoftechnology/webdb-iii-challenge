const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  insert
}

function find() {
  return db('cohorts');
}

function insert(cohort) {
  return db('cohorts')
            .insert(cohort)
            .then(ids => ({ id: ids[0] }))
}