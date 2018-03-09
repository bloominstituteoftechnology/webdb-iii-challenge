exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('tags').insert([
        { id: 1, tag: 'mysql' },
        { id: 2, tag: 'yarn' },
        { id: 3, tag: 'npm' },
      ]);
    });
};
