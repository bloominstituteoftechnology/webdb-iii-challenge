
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Miranda', cohort_id: 2},
        {name: 'Kadence', cohort_id: 4},
        {name: 'John Doe', cohort_id: 4}
      ]);
    });
};
