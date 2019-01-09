
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Paul', cohort_id: 1},
        {name: 'Peter', cohort_id: 1},
        {name: 'Penny', cohort_id: 1}
      ]);
    });
};
