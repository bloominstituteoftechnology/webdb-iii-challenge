exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Caitlin", cohort_id: 1 },
        { name: "Vera", cohort_id: 1 },
        { name: "Ezra", cohort_id: 1 },
        { name: "Josh", cohort_id: 3 },
        { name: "Other gal", cohort_id: 2 },
        { name: "Other guy", cohort_id: 2 }
      ]);
    });
};
