
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Jack', cohort_id: '2'},
        {name: 'Jill', cohort_id: '5'},
        {name: 'James', cohort_id: '2'}
      ]);
    });
};
