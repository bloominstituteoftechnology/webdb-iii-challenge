const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findByCohort
};

function find() {
  return db("cohorts");
}

function findById(id) {
  return db("cohorts")
    .where({ id })
    .first();
}

function add(cohort) {
  return db("cohorts")
    .insert(cohort)
    .into("cohorts");
}

function update(id, changes) {
  return db("cohorts")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("cohorts")
    .where({ id })
    .del();
}

function findByCohort(cohort_id) {
  return db("students")
    .join("cohorts", "cohorts.id", "students.cohort_id")
    .select("students.id", "students.name", "cohorts.name")
    .where("students.cohort_id", cohort_id);
}
