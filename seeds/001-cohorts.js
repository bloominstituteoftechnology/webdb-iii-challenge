
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'WEB 1'},
        { name: 'WEB 2'},
        { name: 'WEB 3'},
        { name: 'WEB 4'},
        { name: 'WEB 5'}
      ]);
    });
};
