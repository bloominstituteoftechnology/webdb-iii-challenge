
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: "Bobby", cohort_ID: 1},
        {name: "Wop", cohort_ID: 1}
      ]);
    });
};
