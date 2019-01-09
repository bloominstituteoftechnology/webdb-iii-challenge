
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Chris Roth', cohort_id: 01},
        {name:'Julie Jonak', cohort_id: 1},
        {name: 'Michael Littleton', cohort_id:1}
      ]);
    });
};
