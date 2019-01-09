
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Rick James', cohort_id: 2},
        {name: 'Tom Hardy', cohort_id: 3},
        {name: 'Alicia Vikander', cohort_id: 1}
      ]);
    });
};
