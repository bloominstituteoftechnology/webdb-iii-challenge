// Test data for the students table on the lambda.sqlite3 database

exports.seed = function(knex, Promise) {
  // Truncates ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Patrick Kennedy', cohort_id: 3 },
        { name: 'Brock Rohloff', cohort_id: 1 },
        { name: 'Derek Jones', cohort_id: 2 },
        { name: 'Kseniya Platonava', cohort_id: 2 },
        { name: 'Patrick Thompson', cohort_id: 1 },
        { name: 'Tom Tarpey', cohort_id: 1 },
        { name: 'Joseph Bradley', cohort_id: 1 }
      ]);
    });
};
