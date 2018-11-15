const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    let query = db('cohorts');
    if (id) query.where('id', Number(id)).first();
    return query;
  },
  getCohortStudents: function(cohortId) {
    return db('students as s')
      .join('cohorts as c', 'c.id', 's.cohort_id')
      .select('s.id', 's.name')
      .where('s.cohort_id', cohortId);
  },
  insert: function(cohort) {
    return db('cohorts')
      .insert(cohort)
      .then(ids => ({ id: ids[0] }));
  },
  update: function(id, cohort) {
    return db('cohorts')
      .where('id', id)
      .update(cohort);
  },
  remove: function(id) {
    return db('cohorts')
      .where('id', id)
      .del();
  }
};
