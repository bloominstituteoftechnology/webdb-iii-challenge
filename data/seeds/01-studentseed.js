
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'example students', cohort_id: '1'},
        {name: 'example students', cohort_id: '2'},
        {name: 'example students', cohort_id: '3'}
      ]);
    });
};
