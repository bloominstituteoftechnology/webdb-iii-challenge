
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Josh', cohort_id: 1},
        {name: 'Paul', cohort_id: 3},
        {name: 'Eric', cohort_id: 3}
      ]);
    });
};
