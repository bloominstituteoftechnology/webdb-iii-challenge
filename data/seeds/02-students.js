
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'First Person', cohort_id: 1},
        {id: 2, name: 'Iam Here', cohort_id: 2},
        {id: 3, name: 'Someone Else', cohort_id: 2}
      ]);
    });
};
