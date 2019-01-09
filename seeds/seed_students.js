
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'Joe', cohort_id: 1},
        {id: 2, name: 'Sally', cohort_id: 2},
        {id: 3, name: 'Jane', cohort_id: 1}
      ]);
    });
};
