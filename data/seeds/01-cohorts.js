
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'Cohort1'},
        {name: 'Cohort2'},
        {name: 'Cohort3'}
      ]);
    });
};
