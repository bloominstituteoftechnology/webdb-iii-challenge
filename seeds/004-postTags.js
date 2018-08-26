
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('postsTags').del()
      .then(function () {
        // Inserts seed entries
        return knex('postsTags').insert([
          {postsId: 1, tagsId:3, createdAt: knex.fn.now()},
          {postsId: 2, tagsId:2, createdAt: knex.fn.now()},
          {postsId: 3, tagsId:1, createdAt: knex.fn.now()},
          {postsId: 1, tagsId:3, createdAt: knex.fn.now()},
          {postsId: 2, tagsId:2, createdAt: knex.fn.now()},
          {postsId: 3, tagsId:1, createdAt: knex.fn.now()}
        ]);
      });
  };
  