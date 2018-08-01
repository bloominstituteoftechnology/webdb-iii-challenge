
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        { userId: 1, text: 'Post 1' },
        { userId: 1, text: 'Post 2' },
        { userId: 1, text: 'Post 3' }
      ]);
    });
};
