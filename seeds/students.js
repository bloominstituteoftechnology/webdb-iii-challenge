exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Mike Jones", cohort_id: 1 },
        { name: "Tommy Huynh", cohort_id: 3 },
        { name: "Ben Tsao", cohort_id: 2 },
        { name: "Jenny Ju", cohort_id: 1 },
        { name: "Chris Louie", cohort_id: 2 },
        { name: "Ben Bernie", cohort_id: 3 }
      ]);
    });
};
