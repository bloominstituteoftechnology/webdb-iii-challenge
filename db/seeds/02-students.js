
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students_table').del()
    .then(function () {
      // Inserts seed entries
      return knex('students_table').insert([
        {cohort_id: 2, name: 'Katie'},
        {cohort_id: 2, name: 'Ben'},
        {cohort_id: 2, name: 'Webster'},
        {cohort_id: 3, name: 'Debbie'}
      ]);
    });
};
