const db = require("../dbConfig.js");

module.exports = {
  get: function(id) {
    let query = db("cohorts as c");

    if (id) {
      query
        .join("students as s", "c.id", "s.cohort_id")
        .select("c.students", "s.name")
        .where("c.id", id);

      const promises = [query, this.getStudentList(id)]; // [ posts, tags ]

      return Promise.all(promises).then(function(results) {
        let [cohorts, students] = results;
        let cohort = cohorts[0];
        cohort.students = students.map(s => s.name);

        return cohort;
      });
    }

    return query;
  },

  getStudentList: function(id) {
    return db("cohorts as c")
      .join("students as s", "c.id", "s.cohort_id")
      .where("c.id", id);
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
