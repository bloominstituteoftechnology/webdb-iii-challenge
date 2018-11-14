const db = require("../dbConfig.js");

module.exports = {
  get,
  insert,
  update,
  remove
};

function get() {
  return db("students");
}

function get(id) {
  return db("students").where({ id: Number(id) });
}

function insert(student) {
  return db("students")
    .insert(student)
    .then(ids => ({ id: ids[0] }));
}

function update(id, student) {
  return db("students")
    .where("id", Number(id))
    .update(student);
}

function remove(id) {
  return db("students")
    .where("id", Number(id))
    .del();
}
