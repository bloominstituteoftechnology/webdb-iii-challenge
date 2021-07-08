
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Yusuf', cohort_id: 1},
        {name: 'Michael', cohort_id: 2},
        {name: 'Edd', cohort_id: 3}
      ]);
    });
};
