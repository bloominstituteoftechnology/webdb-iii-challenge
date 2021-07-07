const knex = require("knex");

//connect to db
const knexConfig = require("../../knexfile.js");
const db = knex(knexConfig.development);

const find = () => {
  return db("students");
};

const findById = id => {
  return db("students")
    .where({ id })
    .first();
};

const insert = newCohort => {
  return db("students").insert(newCohort);
};

const update = (id, updatedCohort) => {
  return db("students")
    .where({ id })
    .update(updatedCohort);
};

const remove = id => {
  return db("students")
    .where({ id })
    .del();
};

module.exports = { find, findById, insert, update, remove };
