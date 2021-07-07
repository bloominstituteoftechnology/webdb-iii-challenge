
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'cohort1'},
        {name: 'cohort2'},
        {name: 'cohort3'}
      ]);
    });
};
