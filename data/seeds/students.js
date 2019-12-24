
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: "Jake", cohort_id: 1 },
        {name: "Phil", cohort_id: 2},
        {name: "Mikaela", cohort_id: 3},
        {name: "Bill", cohort_id: 3}
      ]);
    });
};
