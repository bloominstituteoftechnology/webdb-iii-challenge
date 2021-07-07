
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Lambda Student W', cohort_id : 1},
        { name: 'Lambda Student K', cohort_id : 1},
        { name: 'Lambda Student WK', cohort_id : 2}
      ]);
    });
};
