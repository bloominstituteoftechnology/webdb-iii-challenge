const knex = require('../database/db.js');

const db = {
  getUsers: function() {
    return knex('users');
  },
  getUserById: function(id) {
    return knex('users')
    .where({id});
  },
  postUser: function(user) {
    return knex
      .insert(user)
      .into('users');
  },
  deleteUserById: function(id) {
    return knex('users')
    .where({id})
    .del();
  },
};

module.exports = db;