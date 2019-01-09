
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Marcus', cohort_id: '1'},
        {name: 'Myke', cohort_id: '2'},
        {name: 'Javi', cohort_id: '3'}
      ]);
    });
};
