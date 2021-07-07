
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Mike T', cohort_id: 2},
        {name: 'Renee P', cohort_id: 1},
        {name: 'Johnny V', cohort_id: 3},
        {name: 'Freidrich K', cohort_id: 3},
        {name: 'Angela G', cohort_id: 2},
        {name: 'Patricia D', cohort_id: 1},
        {name: 'Ronaldo W', cohort_id: 2},
      ]);
    });
};
