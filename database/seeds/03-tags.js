
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {id: 1, tagId: 1, tag: 'shopping'},
        {id: 2, tagId: 2, tag: 'wine'},
        {id: 3, tagId: 3, tag: 'pizza'}
      ]);
    });
};
