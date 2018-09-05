exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Phil", cohort_id: "FSW12" },
        { name: "Hank", cohort_id: "CS6" },
        { name: "Billy", cohort_id: "FSW12" },
      ]);
    });
};
