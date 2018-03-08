const knex = require('../db');

const db = {
  get: function(id) {
    let query = db('posts as p');

    if (id) {
      query
        .join('users as u', 'p.userId', 'u.id')
        .select('p.text', 'u.name as postedBy')
        .where('p.id', id);

      const promises = [query, this.getPostTags(id)]; // [ posts, tags ]

      return Promise.all(promises).then(function(results) {
        let [posts, tags] = results;
        let post = posts[0];
        post.tags = tags.map(t => t.tag);

        return post;
      });
    }

    return query;
  },
  getPostTags: function(postId) {
    return db('tags as t')
      .join('posttags as pt', 't.id', 'pt.tagId')
      .select('t.tag')
      .where('pt.postId', postId);
  },
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
