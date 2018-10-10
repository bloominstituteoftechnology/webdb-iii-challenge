exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Billy", cohort_id: "Cohort 1" },
        { name: "Bob", cohort_id: "Cohort 2" },
        { name: "Thornton", cohort_id: "Cohort 3" }
      ]);
    });
};