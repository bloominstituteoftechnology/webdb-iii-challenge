const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  getStretch
};

function find() {
  return db('students');
}

function findById(id) {
  return db('students')
    .where({ id })
    .first();
}

function add(student) {
  return db('students')
    .insert(student)
    .into('students');
}

function update(id, changes) {
  return db('students')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('students')
    .where({ id })
    .del();
}

function getStretch(id) {
   // const cohort = db('cohorts').select('name');
    return db('students')
    .join('cohorts', 'students.cohort_id', '=', 'cohorts.id')
    .where('students.id', id)
    .select('students.name', 'cohorts.name as cohort')
    
}