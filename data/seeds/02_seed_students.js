
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Eric Fleming', cohort_id: 1},
        {name: 'John Smith', cohort_id: 2},
        {name: 'Ryan Matthews', cohort_id: 1},
        {name: 'Pascale Pierre', cohort_id: 1},
        {name: 'Jane Doe', cohort_id: 2},
        {name: 'Logan Wright', cohort_id: 1}
      ]);
    });
};
