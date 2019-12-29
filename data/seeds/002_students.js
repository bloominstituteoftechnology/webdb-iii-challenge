
exports.seed = function(knex, Promise) {
  return knex("students")
    .truncate()
    .then(function () {
      return knex("students").insert([
        { cohort_id: 2, name: "Mitch" },
        { cohort_id: 3, name: "Alfredo" },
        { cohort_id: 1, name: "Benjamino" }
      ]);
    });
};
