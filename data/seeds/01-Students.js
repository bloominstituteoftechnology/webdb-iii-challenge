exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: "Griff", cohort_id: 1 },
        {name: "Julie", cohort_id: 2},
        {name: "Humberto", cohort_id: 3},
        {name: "Michael", cohort_id: 3}
      ]);
    });
};
