exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Sabrina Gear", cohort_id: 1 },
        { name: "Bob Student", cohort_id: 1 },
        { name: "Gene Student", cohort_id: 2 }
      ]);
    });
};
