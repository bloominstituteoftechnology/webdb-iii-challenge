const knex = require('../database/dbConfig');

const post_db = {
  addPost: function(post) {
    return knex.insert(post).into('posts');
  }
}

module.exports = post_db;