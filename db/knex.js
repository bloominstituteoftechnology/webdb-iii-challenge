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

  join3_where_select: (
    refTbl,
    refCol1,
    refCol2,
    refCol3,
    tbl1,
    col1,
    tbl2,
    col2,
    tbl3,
    col3,
    cond,
    sel,
  ) => {
    return knex(refTbl)
      .select(sel)
      .join(tbl1, refCol1, '=', col1)
      .join(tbl2, refCol2, '=', col2)
      .join(tbl3, refCol3, '=', col3)
      .where(cond);
  },
};
