const knex = require('../database/db');

module.exports = {
  add: (tbl, row) => {
    return knex.insert(row).into(tbl);
  },

  get: tbl => {
    return knex(tbl);
  },

  getBy: (tbl, cond) => {
    return knex(tbl).where(cond);
  },

  getOneBy: (tbl, cond) => {
    return knex(tbl)
      .where(cond)
      .first();
  },

  update: (tbl, id, row) => {
    return knex(tbl)
      .where({ id })
      .update(row);
  },

  del: (tbl, id) => {
    return knex(tbl)
      .where({ id })
      .del();
  },
};
