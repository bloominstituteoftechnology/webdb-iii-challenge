exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Larry", cohort_id: "AD-12" },
        { name: "Jerry", cohort_id: "DQ-31" },
        { name: "Tim", cohort_id: "UP-78" }
      ]);
    });
};
