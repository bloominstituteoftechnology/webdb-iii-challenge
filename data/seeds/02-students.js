exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Jim", cohort_id: "Cohort 1" },
        { name: "Bob", cohort_id: "Cohort 1" },
        { name: "Pete", cohort_id: "Cohort 1" }
      ]);
    });
};
