const knex = require('../database/dbConfig');

const post_db = {
  addPost: function(post) {
    return knex.insert(post).into('posts');
  },
  allPosts: function() {
    return knex('posts');
  },
  getID: function(postId) {
    return knex('posts').where({ postId });
  },
  updatePost: function(id, post) {
    return knex('posts').where({ id }).update(post);
  },
  deletePost: function(id) {
    return knex('posts').where({ id }).del();
  }

}

module.exports = post_db;