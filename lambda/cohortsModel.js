const knex = require("knex");

const knexConfig = require("../knexfile.js");

const lambda = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  add,
  remove,
  getStudentsByID,
  update
};

function find() {
  return lambda("cohorts");
}

function findById(id) {
  return lambda("cohorts").where({ id });
}

function add(cohort) {
  return lambda("cohorts")
    .insert(cohort)
    .into("cohorts");
}

function remove(id) {
  return lambda("cohorts")
    .where({ id: id })
    .del();
}

function getStudentsByID(id) {
  return lambda("students")
  .where({id:id}) 
}

function update(id, changes){
    return lambda("cohorts")
    .where({id})
    .update(changes)
}
