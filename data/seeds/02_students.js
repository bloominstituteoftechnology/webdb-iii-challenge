
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Cody', cohort_id: 1},
        {name: 'Phil', cohort_id: 1},
        {name: 'Drew', cohort_id: 1},
        {name: 'Kimala', cohort_id: 1},
        {name: 'Scott', cohort_id: 2},
        {name: 'Amber', cohort_id: 2},
        {name: 'Russ', cohort_id: 2},
        {name: 'Brandon', cohort_id: 2},
        {name: 'Ryan', cohort_id: 2}
      ]);
    });
};
