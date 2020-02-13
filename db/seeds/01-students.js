
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Jerry', cohort_id: 1},
        {name: 'Keegan', cohort_id: 2},
        {name: 'Bill', cohort_id: 3}
      ]);
    });
};
