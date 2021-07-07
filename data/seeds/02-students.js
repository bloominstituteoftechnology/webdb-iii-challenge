
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Mark', cohort_id: 3},
        {name: 'Kevin', cohort_id: 1},
        {name: 'Julie', cohort_id: 1},
        {name: 'Keith', cohort_id: 2}
      ]);
    });
};
