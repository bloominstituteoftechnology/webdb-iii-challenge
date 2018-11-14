
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: "McKay", cohort_id: 2},
        {name: "Adam", cohort_id: 2},
        {name: "Ryan", cohort_id: 2},
        {name: "Lola", cohort_id: 2},
        {name: "Jeff", cohort_id: 2},
      ]);
    });
};
