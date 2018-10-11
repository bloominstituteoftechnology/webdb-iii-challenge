
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Kevin', cohort_id: 2},
        {name: 'Andy', cohort_id: 2},
        {name: 'John', cohort_id: 2}
      ]);
    });
};
