exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { cohort_id: 1, name: "Matt" },
        { cohort_id: 2, name: "Jordan" },
        { cohort_id: 2, name: "Gabriel" }
      ]);
    });
};
