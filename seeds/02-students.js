
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Michael', cohort_id: '1'},
        { name: 'Jack', cohort_id: '2' },
        { name: 'Jamie', cohort_id: '3' },
      
      ]);
    });
};
