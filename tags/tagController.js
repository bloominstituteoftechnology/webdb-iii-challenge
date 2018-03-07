const knex = require('../database/db.js');

const db = {
  getTags: function() {
    return knex('tags');
  },
  postTag: function(tag) {
    console.log('postTag: ', tag);
    return knex
      .insert(tag)
      .into('tags');
  },
};

module.exports = db;