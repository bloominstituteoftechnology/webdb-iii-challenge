
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Tsai Huang', cohort_id:1},
        {name: 'Brock Turner', cohort_id:1},
        {name: 'Keiran Kozlowsk', cohort_id:1}
      ]);
    });
};
