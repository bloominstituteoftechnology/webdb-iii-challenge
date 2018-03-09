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

  join3_where_select: (ref, tbl1, tbl2, tbl3, cond, sel) => {
    return knex(ref.tbl)
      .join(tbl1.id, ref.col1, '=', tbl1.col)
      .join(tbl2.id, ref.col2, '=', tbl2.col)
      .join(tbl3.id, ref.col3, '=', tbl3.col)
      .where(cond)
      .select(sel);
  },
};
