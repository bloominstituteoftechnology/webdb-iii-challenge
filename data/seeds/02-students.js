exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Karmry", cohort_id: 1 },
        { name: "Peter", cohort_id: 2 },
        { name: "Phil", cohort_id: 3 }
      ]);
    });
};
