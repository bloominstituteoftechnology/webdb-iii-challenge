const knex = require('../database/dbConfig');

const postTags_db = {
  addTag: function(obj) {
    return knex.insert(obj).into('post_tags')
  },
  allPostTags: function() {
    return knex('post_tags');
  }
}

module.exports = postTags_db;