
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {cohort_name: 'CS1'},
        {cohort_name: 'CS2'},
        {cohort_name: 'CS3'},
        {cohort_name: 'CS4'},
        {cohort_name: 'CS5'},
        {cohort_name: 'CS6'},
      ]);
    });
};
