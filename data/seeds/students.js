
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: "Ben", cohort_id: 1 },
        {name: "Colin", cohort_id: 2},
        {name: "Robert", cohort_id: 3},
        {name: "Dewayne", cohort_id: 4}
      ]);
    });
};
