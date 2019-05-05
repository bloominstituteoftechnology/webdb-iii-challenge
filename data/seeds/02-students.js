
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Christopher', cohort_id: 1},
        {name: 'William', cohort_id: 2},
        {name: 'Larry', cohort_id: 2}
      ]);
    });
};
