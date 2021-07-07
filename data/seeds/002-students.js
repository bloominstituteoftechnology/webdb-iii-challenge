exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Zach', cohort_id: 1 },
        { name: 'Luis', cohort_id: 1 },
        { name: 'Linda', cohort_id: 2 },
        { name: 'Pat', cohort_id: 3 },
        { name: 'Greg', cohort_id: 4 },
      ]);
    });
};
