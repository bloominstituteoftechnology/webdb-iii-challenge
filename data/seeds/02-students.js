
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Susie', cohort_id: '3' },
        { name: 'Jimmy', cohort_id: '2' },
        { name: 'Carol', cohort_id: '1' }
      ]);
    });
};
