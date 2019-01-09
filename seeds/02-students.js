
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Superman Stefan'},
        {cohort_id: 3, name: 'King Chris'},
        {cohort_id: 1, name: 'Rock Roth'}
      ]);
    });
};
