
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Jesse', cohort_id: 1},
        {name: 'Alex', cohort_id: 2},
        {name: 'Oliver', cohort_id: 3},
        {name: 'Marguel', cohort_id: 4},
        {name: 'Kelly', cohort_id: 5},
        {name: 'Lorenzo', cohort_id: 6},
        {name: 'Courtney', cohort_id: 7}
      ]);
    });
};
