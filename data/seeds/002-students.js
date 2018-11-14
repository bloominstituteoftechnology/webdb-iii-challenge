exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { cohort_id: 1, name: 'Ryan' },
        { cohort_id: 2, name: 'Eric' },
        { cohort_id: 3, name: 'Emily' },
        { cohort_id: 4, name: 'Grace' },
        { cohort_id: 5, name: 'Harry' },
        { cohort_id: 1, name: 'Marg' },
        { cohort_id: 2, name: 'Larry' },
        { cohort_id: 3, name: 'Duke' },
        { cohort_id: 4, name: 'Wynona' },
        { cohort_id: 5, name: 'Fin' }
      ]);
    });
};
