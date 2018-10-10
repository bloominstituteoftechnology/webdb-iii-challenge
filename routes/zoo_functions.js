const config = require('../knexfile.js');
const knex = require('knex');
const db = knex(config.development);

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};


function find() {
  return db('cohorts');
}

function findById(id) {
  return db('cohorts')
    .where({ id })
    .first();
}

function add(cohort) {
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