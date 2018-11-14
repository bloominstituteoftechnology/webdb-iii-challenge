exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'Wright1' },
        { name: 'Wright2' },
        { name: 'Wright3' }
      ]);
    });
};
