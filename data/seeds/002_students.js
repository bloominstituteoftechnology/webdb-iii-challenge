
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Kyran', cohort_id: 3 },
        { name: 'Tommy', cohort_id: 5 },
        { name: 'Kam', cohort_id: 1 }
      ]);
    });
};
