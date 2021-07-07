const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('cohorts');
}

function getById(id) {
  return db('cohorts')
    .where({ id })
    .first();
}

function insert(cohort) {
  return db('cohorts')
    .insert(cohort)
    .into('cohorts');
}

function update(id, changes) {
  return db('cohorts')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('cohorts')
    .where({ id })
    .del();
}