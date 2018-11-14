
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'ABC'},
        {cohort_id: 2, name: 'DEF'},
        {cohort_id: 3, name: 'HIJ'},
        {cohort_id: 3, name: 'XYZ'},
      ]);
    });
};
