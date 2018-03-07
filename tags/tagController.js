const knex = require('../database/db');

const db = {
  getAll() {
    return knex('tags');
  }
}

module.exports = db;