
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Katy Hollobaugh', cohort_id: 1},
        {name: 'Sabrina Gear', cohort_id: 2},
        {name: 'Kevin Brack', cohort_id: 3}
      ]);
    });
};
