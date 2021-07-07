
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Austin', cohort_id: 1},
        {name: 'Anakin', cohort_id: 1},
        {name: 'Obi-Wan', cohort_id: 1}
      ]);
    });
};
