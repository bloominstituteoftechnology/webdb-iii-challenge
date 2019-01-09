const db = require("../dbConfig.js");

module.exports = {
  get: function(id) {
    let query = db("cohorts");
    if (id) {
      query.where("id", id);
    }
    return query;
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