exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { cohort_id: 1, name: 'Daniel' },
        { cohort_id: 2, name: 'Rob' },
        { cohort_id: 3, name: 'Wanda' },
        { cohort_id: 4, name: 'Leslie' },
        { cohort_id: 3, name: 'Nicole' },
      ]);
    });
};
