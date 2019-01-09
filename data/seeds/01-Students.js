
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Chris', cohort_id:2},
        { name: 'Julie', cohort_id:2},
        { name: 'Griffin', cohort_id:1},
        { name: 'Humberto', cohort_id:1},
        { name: 'Jorge', cohort_id:3}
      ]);
    });
};
