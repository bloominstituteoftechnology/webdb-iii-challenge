const knex = require('../database/db.js');

const db = {
  getTags: function() {
    return knex('tags');
  },
  getTagById: function(id) {
    return knex('tags')
    .where({id});
  },
  postTag: function(tag) {
    console.log('postTag: ', tag);
    return knex
      .insert(tag)
      .into('tags');
  },
  deleteTagById: function(id) {
    return knex('tags')
    .where({id})
    .del();
  },
};

module.exports = db;