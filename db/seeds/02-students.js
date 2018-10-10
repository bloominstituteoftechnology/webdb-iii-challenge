
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('student').insert([
        { name: 'Betty', cohort_id: 2 },
        { name: 'Bill', cohort_id: 3 },
        { name: 'Sam', cohort_id: 4 },
        { name: 'Bryan', cohort_id: 4 },
        { name: 'Katy', cohort_id: 4 }
      ]);
    });
};
