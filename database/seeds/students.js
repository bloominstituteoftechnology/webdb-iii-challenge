
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'John Johnson', cohort_id: 1},
        {name: 'Joe Jackson', cohort_id: 2},
        {name: 'Daphne Delois', cohort_id: 3}
      ]);
    });
};