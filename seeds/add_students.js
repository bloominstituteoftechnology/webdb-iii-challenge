
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Bruce Banner'},
        {cohort_id: 1, name: 'Tony Stark'},
        {cohort_id: 1, name: 'Peter Parker'},
        {cohort_id: 2, name: 'Bruce Wayne'},
        {cohort_id: 2, name: 'Clark Kent'},
        {cohort_id: 2, name: 'Lois Lane'},
        {cohort_id: 3, name: 'Cloud Strife'},
        {cohort_id: 3, name: 'Tifa Lockheart'},
        {cohort_id: 3, name: 'Aerith Gainsborough'}
      ]);
    });
};
