
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Jacob', cohort_id: 1},
        {name: 'Ryan', cohort_id: 2},
        {name: 'Abi', cohort_id: 3}
      ]);
    });
};
