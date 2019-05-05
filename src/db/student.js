const db = require('../dbConfig.js');
const mappers = require('./mappers');

module.exports = {
  get: function(id) {
    let query = db('students');

    if (id) {
      return query
        .where('id', id)
        .first()/*
        .then(action => mappers.actionToBody(action));*/
    }

    return query/*.then(actions => {
      return actions.map(action => mappers.actionToBody(action));
    });*/
  },
  insert: function(student) {
    return db('students')
      .insert(student)
      .then(([id]) => this.get(id));
  },
  update: function(id, changes) {
    return db('students')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
  },
  remove: function(id) {
    return db('students')
      .where('id', id)
      .del();
  },
};
