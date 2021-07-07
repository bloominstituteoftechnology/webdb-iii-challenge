exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Jesse Anderson', cohort_id: 1 },
        { name: 'Angela La Salle', cohort_id: 1 },
        { name: 'Christopher Ferrel', cohort_id: 1 },
        { name: 'Kelly Manahan', cohort_id: 1 },
        { name: 'Luis Alvarez', cohort_id: 1 },
        { name: 'Rob Salzberg', cohort_id: 1 },
        { name: 'Michael Trew', cohort_id: 1 }
      ]);
    });
};
