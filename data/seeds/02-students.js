
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Jorge Osto', cohort_id: 1},
        {name: 'Ginny Weasley', cohort_id: 2},
        {name: 'Peyton Runyan', cohort_id: 4},
        {name: 'Tommy Collison', cohort_id: 1},
      ]);
    });
};
