exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { cohort_id: 1, name: 'Andre Myrick' },
        { cohort_id: 2, name: 'Fake Student' },
        { cohort_id: 3, name: 'Fakington McStudent' },
        { cohort_id: 4, name: 'Fakeculous de Student' },
      ]);
    });
};
