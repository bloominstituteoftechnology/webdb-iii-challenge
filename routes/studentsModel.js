const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
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