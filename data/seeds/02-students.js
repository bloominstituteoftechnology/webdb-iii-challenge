
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'i am', cohort_id: '1'},
        {name: 'so bad', cohort_id: '2'},
        {name: 'at coding', cohort_id: '3'}
      ]);
    });
};
