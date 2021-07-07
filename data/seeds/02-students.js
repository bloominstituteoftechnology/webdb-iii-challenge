
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'test', cohort_id: 1},
        {name: 'tester', cohort_id: 2},
        {name: 'woo', cohort_id: 3}
      ]);
    });
};
