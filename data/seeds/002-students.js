exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { cohort_id: 1, name: 'Cohort started in May' },
        { cohort_id: 2, name: 'Cohort started in June' },
        { cohort_id: 3, name: 'Cohort started in July' },
        { cohort_id: 4, name: 'Cohort started in August' },
        { cohort_id: 5, name: 'Cohort started in September' }
      ]);
    });
};
