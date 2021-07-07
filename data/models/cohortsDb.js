const knex = require("knex");

//connect to db
const knexConfig = require("../../knexfile.js");
const db = knex(knexConfig.development);

const find = () => {
  return db("cohorts");
};

const findById = id => {
  return db("cohorts")
    .where({ id })
    .first();
};

const insert = newCohort => {
  return db("cohorts").insert(newCohort);
};

const update = (id, updatedCohort) => {
  return db("cohorts")
    .where({ id })
    .update(updatedCohort);
};

const remove = id => {
  return db("cohorts")
    .where({ id })
    .del();
};

const getStudents = id => {
  return db("students").where({ cohort_id: id });
};

module.exports = { find, findById, insert, update, remove, getStudents };
