const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  insert,
  findById
}

function find() {
  return db('students');
}

function findById(id) {
  return db('students').where({ id: Number(id)})
}

function insert(student) {
  return db('students')
            .insert(student)
            .then(ids => ({ id: ids[0] }))
}