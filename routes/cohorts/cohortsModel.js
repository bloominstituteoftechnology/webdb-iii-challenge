const knex = require('knex');

const knexConfig = require('../../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  get,
  getById,
  getStudents,
  post,
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

function getStudents(id) {
    return db('cohorts').from('students').where({
        cohort_id: id
    }).select('*');
  }

function post(course) {
  return db('cohorts')
    .insert(course)
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