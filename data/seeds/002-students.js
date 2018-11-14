
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Randi Tansons'},
        {cohort_id: 2, name: 'Cardon Forstz'},
        {cohort_id: 3, name: 'Delli Pontrone'},
        {cohort_id: 4, name: 'Brif Branfort'},
        {cohort_id: 5, name: 'Trea Klarm'},
        {cohort_id: 5, name: 'Brad Mortensen'}
      ]);
    });
};