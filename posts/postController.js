const knex = require('../database/dbConfig');

const post_db = {
  addPost: function(post) {
    return knex.insert(post).into('posts');
  },
  allPosts: function() {
    return knex('posts');
  }
}

module.exports = post_db;