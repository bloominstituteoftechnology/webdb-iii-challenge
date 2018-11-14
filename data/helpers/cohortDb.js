const db = require("../dbConfig.js");

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};

function find() {
  return db("cohorts");
}

function findById(id) {
  return db("cohorts").where({ id: Number(id) });
}

function insert(cohort) {
  return db("cohorts")
    .insert(cohort)
    .then(ids => ({ id: ids[0] }));
}

function update(id, cohort) {
  return db("cohorts")
    .where("id", Number(id))
    .update(cohort);
}

function remove(id) {
  return db("cohorts")
    .where("id", Number(id))
    .del();
}
