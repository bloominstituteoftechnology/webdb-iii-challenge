const db = require("../dbConfig.js");

module.exports = {
  get: function(id) {
    let query = db("cohorts");
    if (id) {
      query.where("id", id);
    }
    return query;
  },
  getCohortStudents: function(cohort_id) {
    return db("students as s")
      .join("cohorts as c", "c.id", "s.cohort_id")
      .select("s.name", "c.name as cohort")
      .where("s.cohort_id", cohort_id);
  },
  insert: function(cohort) {
    return db("cohorts")
      .insert(cohort)
      .then(ids => ({ id: ids[0] }));
  },
  update: function(id, cohort) {
    return db("cohorts")
      .where("id", id)
      .update(cohort);
  },
  remove: function(id) {
    return db("cohorts")
      .where("id", id)
      .del();
  }
};
