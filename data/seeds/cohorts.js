
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
  .truncate()
  .then(function() {
    // Inserts seed entries
    return knex('cohorts').insert([
      { name: 'cohort 1' },
      { name: 'cohort 2' },
      { name: 'cohort 3' }
    ]);
  });
};