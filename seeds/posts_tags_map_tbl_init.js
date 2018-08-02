
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts_tags_map').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts_tags_map').insert([
        {posts_id: 1, tags_id: 3},
        {posts_id: 1, tags_id: 7},
        {posts_id: 6, tags_id: 3},
        {posts_id: 7, tags_id: 5},
        {posts_id: 7, tags_id: 6},
      ]);
    });
};
