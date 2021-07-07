const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  get, getById, insert, update, remove
};

function get() {
  return db('students');
};

function getById(id) {
  return db('students')
    .where({ id })
    .first();
}

function insert(student) {
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