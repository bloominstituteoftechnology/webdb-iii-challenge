const knex = require('../database/db.js');

const db = {
  getUsers: function() {
    return knex('users');
  },
  postUser: function(user) {
    return knex
      .insert(user)
      .into('users');
  },
};

module.exports = db;