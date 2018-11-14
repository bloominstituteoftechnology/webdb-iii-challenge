
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { cohort_id: 1, name: 'sam' },
        { cohort_id: 1, name: 'samg' },
        { cohort_id: 2, name: 'frodo' },
        { cohort_id: 3, name: 'peregrin' },
        { cohort_id: 4, name: 'meriadoc' },
      ]);
    });
};
