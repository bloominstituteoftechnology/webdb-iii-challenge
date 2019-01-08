exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Jess Harrison", cohort_id: 1 },
        { name: "Julie Jonak", cohort_id: 1 },
        { name: "Someone I don't know", cohort_id: 3 }
      ]);
    });
};
