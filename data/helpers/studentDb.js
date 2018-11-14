const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    let query = db('students');
    if (id) query.where('id', Number(id)).first();
    return query;
  },
  insert: function(student) {
    return db('students')
      .insert(student)
      .then(ids => ({ id: ids[0] }));
  },
  update: function(id, student) {
    return db('students')
      .where('id', id)
      .update(student);
  },
  remove: function(id) {
    return db('students')
      .where('id', id)
      .del();
  }
};
