const knex = require('../db');

const db = {
  getAll: function() {
    return knex('tags');
  },
  getById: function(id) {
    return knex('tags').where({ id });
  },
  addtag: function(tag) {
    return knex.insert(tag).into('tags');
  },
  nuke: function(id) {
    return knex('tags')
      .where({ id })
      .del();
  },
  update: function(id, tag) {
    return knex('tags')
      .where({ id })
      .update(tag);
  }
};

module.exports = db;
