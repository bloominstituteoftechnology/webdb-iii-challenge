const knex = require('../database/db.js');

const db = {
  getPosts: function() {
    return knex('posts');
  },
  postPost: function(post) {
    return knex
      .insert(post)
      .into('posts');
  },
};

module.exports = db;