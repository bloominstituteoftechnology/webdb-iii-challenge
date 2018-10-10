
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Matt', cohort_id: 1},
        {name: 'Julio', cohort_id: 3},
        {name: 'Miriam', cohort_id: 3}
      ]);
    });
};
