const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("students");
}

function findById(id) {
  return db("students")
    .join("cohorts", "cohorts.id", "students.cohort_id")
    .select("students.id", "students.name", { cohort: "cohorts.name" })
    .where("students.cohort_id", id);
}

function add(student) {
  return db("students")
    .insert(student)
    .into("students");
}

function update(id, changes) {
  return db("students")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("students")
    .where({ id })
    .del();
}
