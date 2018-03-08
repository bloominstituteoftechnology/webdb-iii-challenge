const knex = require('../db');

const db = {
  getAll: function() {
    return knex('posts');
  },
  getById: function(id) {
    return knex('posts').where({ id });
  },
  addPost: function(post) {
    return knex.insert(post).into('posts');
  },
  nuke: function(id) {
    return knex('posts')
      .where({ id })
      .del();
  },
  update: function(id, post) {
    return knex('posts')
      .where({ id })
      .update(post);
  },
  postTagIt: function (id) {
    return knex('postTags')
    .where({ postId: id })
    .join('tags', 'tags.id', '=', 'postTags.tagId')
    .join('posts', 'posts.id', '=', 'postTags.postId')
    .join('users', 'users.id', '=', 'posts.userId')
    .select('name', 'tag')
  }
};

module.exports = db;
