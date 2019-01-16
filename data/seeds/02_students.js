
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Test Name'},
        {cohort_id: 1, name: 'Test Name 2'},
        {cohort_id: 1, name: 'Test Name 3'},
        {cohort_id: 2, name: 'Test Name 4'},
        {cohort_id: 2, name: 'Test Name 5'},
        {cohort_id: 2, name: 'Test Name 5'},
      ]);
    });
};
