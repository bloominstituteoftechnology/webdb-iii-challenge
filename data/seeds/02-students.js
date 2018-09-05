
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Susie', cohort_id: 'CS10' },
        { name: 'Jimmy', cohort_id: 'CS9' },
        { name: 'Carol', cohort_id: 'CS8' }
      ]);
    });
};
