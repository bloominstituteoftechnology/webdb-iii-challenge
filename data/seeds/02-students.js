
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'Yakov', cohort_id: 1},
        {id: 2, name: 'Pugsley', cohort_id: 2},
        {id: 3, name: 'Darien', cohort_id: 3},
        {id: 4, name: 'Thaldrus', cohort_id: 1},
        {id: 5, name: 'Zol', cohort_id: 2},
        {id: 6, name: 'Kite', cohort_id: 3},
      ]);
    });
};
