const db = require("../dbConfig.js");

module.exports = {
  get: function(id) {
    let query = db("students");
    if (id) {
      return db("cohorts as c")
      .join("students as s", "s.cohort_id", "c.id")
      .select("s.id", "s.name", "c.name as cohort")
      .where("s.id", id);
    }
    return query;
  },
  insert: function(student) {
    return db("students")
      .insert(student)
      .then(ids => ({ id: ids[0] }));
  },
  update: function(id, student) {
    return db("student")
      .where("id", id)
      .update(student);
  },
  remove: function(id) {
    return db("students")
      .where("id", id)
      .del();
  }
};