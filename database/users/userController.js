const knex = require('../db');

const db = {
  getAll: function() {
    return knex('users');
  },
  getById: function(id) {
    return knex('users').where({ id });
  },
  getPostsByID: function(id) {
    return knex('posts').where('userId', id)
  },
  addUser: function(user) {
    return knex.insert(user).into('users');
  },
  nuke: function(id) {
    return knex('users')
      .where({ id })
      .del();
  },
  update: function(id, user) {
    return knex('users')
      .where({ id })
      .update(user);
  }
};

module.exports = db;
