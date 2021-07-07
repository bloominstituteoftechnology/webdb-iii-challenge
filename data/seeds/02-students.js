
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Albus', cohort_id: 3 },
        { name: 'Sirius', cohort_id: 2 },
        { name: 'Dobby', cohort_id: 1 }
      ]);
    });
};
