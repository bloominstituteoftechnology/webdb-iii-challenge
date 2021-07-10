
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {id: 1, tag: 'movies'},
        {id: 2, tag: 'sports'},
        {id: 3, tag: 'science'}
      ]);
    });
};
