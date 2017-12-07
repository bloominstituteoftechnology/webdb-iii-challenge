
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('PostsTags').del()
    .then(function () {
      // Inserts seed entries
      return knex('PostsTags').insert([
        {postId: 1,  tagId: 1},
        {postId: 1,  tagId: 2},
        {postId: 1,  tagId: 3},
        {postId: 2,  tagId: 1},
        {postId: 2,  tagId: 2},
        {postId: 3,  tagId: 3},
      ]);
    });
};
