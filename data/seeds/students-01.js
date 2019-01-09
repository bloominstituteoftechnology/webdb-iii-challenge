
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'Luke Cage', cohort_id: 1},
        {id: 2, name: 'Scorpion', cohort_id: 1},
        {id: 3, name: 'Jax', cohort_id: 1},
        {id: 4, name: 'Sonya Blade', cohort_id: 2},
        {id: 5, name: 'Jade', cohort_id: 2},
        {id: 6, name: 'SubZero', cohort_id: 3},
        {id: 7, name: 'Lou Kang', cohort_id: 3},
      ]);
    });
};
