
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Kitty Cat', cohort_id: 1},
        {name: 'Lidiia', cohort_id: 1},
        {name: 'Best Student', cohort_id: 1}
      ]);
    });
};
