
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Abdul-one', cohort_id: 1},
        {name: 'Abdul-two', cohort_id: 2},
        {name: 'Abdul-three', cohort_id: 3}
      ]);
    });
};
