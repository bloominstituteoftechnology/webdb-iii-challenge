
exports.seed = function(knex, Promise) {
  return knex('students').truncate()
    .then(function () {
      return knex('students').insert([
        {name: "Vera", cohort_id: 13},
        {name: "Kaitlyn", cohort_id: 9},
        {name: "Katia", cohort_id: 12},
        {name: "Jakee", cohort_id: 5},
        {name: "Emily", cohort_id: 13}
      ]);
    });
};
