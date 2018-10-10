
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: "Michael Hacker", cohort_id: 1},
        {name: "Coder McProgrammer", cohort_id: 2},
        {name: "Typey Clickenstein", cohort_id: 3}
      ]);
    });
};
