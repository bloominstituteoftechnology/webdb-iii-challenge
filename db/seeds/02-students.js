
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Charlie', cohort_id: 2},
        {name: 'Nick', cohort_id: 3},
        {name: 'Sam', cohort_id: 5},
        {name: 'Bryan', cohort_id: 5},
        {name: 'Bob', cohort_id: 5}
      ]);
    });
};
