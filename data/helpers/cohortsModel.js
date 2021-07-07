const db = require('../dbconfig.js');

module.exports = {
  find,
  findById,
  findByStudentsbyCohortId,
  insert,
  update,
  remove
}

function find() {
  return db('cohorts')
}

function findById(id) {
  return db('cohorts').where('id', id)
}

function findByStudentsbyCohortId(id) {
  return db('students').where('cohort_id', id)
}

function insert(cohort) {
  return db('cohorts').insert(cohort)
}

function update(id, change) {
  return db('cohorts').where('id', id).update(change)
}

function remove(id) {
  return db('cohorts').where('id', id).del()
}