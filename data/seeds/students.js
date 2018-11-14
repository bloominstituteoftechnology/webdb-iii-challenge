exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Matt', cohort_id: 1 },
        { name: 'Natalie', cohort_id: 1 },
        { name: 'Jonas', cohort_id: 2 },
        { name: 'Henry', cohort_id: 2 },
        { name: 'Norah', cohort_id: 3 },
        { name: 'Gemma', cohort_id: 3 },
        { name: 'Evan', cohort_id: 2 }
      ]);
    });
};
