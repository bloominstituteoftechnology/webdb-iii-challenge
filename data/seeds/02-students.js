
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Michelle', cohort_id: 1 },
        {name: 'John', cohort_id: 1 },
        {name: 'Roxanne', cohort_id: 2 },
      ]);
    });
};
