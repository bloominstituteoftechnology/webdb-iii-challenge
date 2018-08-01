
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('posttags').del()
    .then(function () {
      // Inserts seed entries
      return knex('posttags').insert([
        { postId: 1, tagId: 1 },
        { postId: 1, tagId: 2 },
        { postId: 1, tagId: 3 }
      ]);
    });
};
