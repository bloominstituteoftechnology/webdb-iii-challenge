
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Leslie', cohort_id: 8},
        {name: 'Tom', cohort_id: 8},
        {name: 'April', cohort_id: 9},
        {name: 'Michele', cohort_id: 10},
        {name: 'Romy', cohort_id: 10},
      ]);
    });
};
