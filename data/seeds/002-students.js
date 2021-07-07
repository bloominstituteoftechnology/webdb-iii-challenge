exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { cohort_id: 1, name: "Billy Everyteen" },
        { cohort_id: 2, name: "Adam" },
        { cohort_id: 2, name: "Frank" },
        { cohort_id: 2, name: "Ryan" },
        { cohort_id: 2, name: "Chance" },
        { cohort_id: 3, name: "John Doe" }
      ]);
    });
};
