exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function() {
      // Inserts seed entries
      return knex('tags').insert([
        { tagId: 1, tag: 'programming' },
        { tagId: 2, tag: 'blockchain' },
        { tagId: 3, tag: 'space' },
        { tagId: 4, tag: 'database systems' },
        { tagId: 5, tag: 'machine learning' }
      ]);
    });
};