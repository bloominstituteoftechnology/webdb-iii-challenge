
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Brandon', cohort_id: 1},
        {name: 'Bill', cohort_id: 2},
        {name: 'Frank', cohort_id: 3},
        {name: 'Hank', cohort_id: 3}
      ]);
    });
};
