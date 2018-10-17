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
  return db('courses');
}

function findById(id) {
  return db('courses')
    .where({ id })
    .first();
}

function add(course) {
  return db('courses')
    .insert(course)
    .into('courses');
}

function update(id, changes) {
  return db('courses')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('courses')
    .where({ id })
    .del();
}

// repository pattern for data access
