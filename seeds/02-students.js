
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Jeremy Kepf', cohort_id: 3},
        {name: 'Joe', cohort_id: 2},
        {name: 'Alex', cohort_id: 2}
      ]);
    });
};
