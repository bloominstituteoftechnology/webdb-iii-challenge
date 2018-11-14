
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { id: 1, cohort_id: 1, name: 'shawn'},
        { id: 2, cohort_id: 2, name: 'joe'},
        { id: 3, cohort_id: 3, name: 'ken'}
      ]);
    });
};
