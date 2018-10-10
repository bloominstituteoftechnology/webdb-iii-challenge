const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  findStudents,
};

function find() {
  return db('cohorts');
}

function findById(id) {
  return db('cohorts')
    .where({ id })
    .first();
}

function findStudents(id) {
  return db('students').where({ cohort_id: id });
}
