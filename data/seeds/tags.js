
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {
          id: 1,
          tag: 'tag test 1'
        },
        {
          id: 2,
          tag: 'tag test 2'
        },
        {
          id: 3,
          tag: 'tag test 3'
        }
      ]);
    });
};
