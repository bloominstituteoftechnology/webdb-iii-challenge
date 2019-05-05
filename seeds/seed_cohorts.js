
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, name: 'Cohort 1'},
        {id: 2, name: 'Cohort 2'},
        {id: 3, name: 'Cohort 3'}
      ]);
    });
};
