
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Bob'},
        {cohort_id: 2, name: 'Sam'},
        {cohort_id: 3, name: 'Steven'},
        {cohort_id: 4, name: 'Joe'},
        {cohort_id: 3, name: 'Frodo'}
      ]);
    });
};
