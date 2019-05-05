
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Billy Joe', cohort_id : 1},
        {name: 'Joey Bill', cohort_id : 2},
        {name: 'Joel Billson', cohort_id : 3},
        {name: 'Jean Johnson', cohort_id : 2},
        {name: 'Jane Johnson', cohort_id : 2}
      ]);
    });
};
