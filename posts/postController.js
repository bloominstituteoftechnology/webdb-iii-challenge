const knex = require('../database/db.js');

const db = {
  getPosts: function() {
    return knex('posts');
  },
  getPostById: function(id) {
    return knex('posts')
    .where({id});
  },
  postPost: function(post) {
    return knex
      .insert(post)
      .into('posts');
  },
  deletePostById: function(id) {
    return knex('posts')
    .where({id})
    .del();
  },
};

module.exports = db;