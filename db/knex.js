const knex = require('../database/db');

module.exports = {
  add: (tbl, row) => {
    return knex.insert(row).into(tbl);
  },

  get: tbl => {
    return knex(tbl)
  },

  getById: (tbl, id) => {
    return knex(tbl).where({ id }).first()
  }
};
