
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Micheal Smith', cohort_id:1},
        {name: 'Brian Jones', cohort_id:3},
        {name: 'Maria Wilson', cohort_id:2}
      ]);
    });
};
