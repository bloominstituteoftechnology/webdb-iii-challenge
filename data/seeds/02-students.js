
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Alexandra', cohort_id: 1},
        {name: 'Toby', cohort_id: 3},
        {name: 'Lucy', cohort_id: 2}
      ]);
    });
};
