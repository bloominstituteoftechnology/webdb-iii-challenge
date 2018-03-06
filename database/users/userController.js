const knex = require('../database/db.js');

const db = {
  getAll: function() {
    return knex('users');
  },
  getById: function(id) {
    return knex('users').where({ id });
  },
  addUser: function(user) {
    return knex.insert(user).into('user');
  },
  nuke: function(id) {
    return knex('users')
      .where({ id })
      .del();
  },
  update: function(id, user) {
    return knex('user')
      .where({ id })
      .update(user);
  }
};

module.exports = db;
