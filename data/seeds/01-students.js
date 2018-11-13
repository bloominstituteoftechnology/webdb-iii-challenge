
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Lee', cohort_id: 7},
        {name: 'FakeLee', cohort_id: 8},
        {name: 'LeeFake', cohort_id: 9}
      ]);
    });
};
