exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Adam", cohort_id: 1 },
        { name: "Matt", cohort_id: 1 },
        { name: "Jordan", cohort_id: 1 },
        { name: "Lola", cohort_id: 1 },
        { name: "Gabe", cohort_id: 1 }
      ]);
    });
};
