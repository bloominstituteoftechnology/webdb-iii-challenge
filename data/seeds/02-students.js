exports.seed = function(knex, Promise) {
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Rob", cohort_id: 1 },
        { name: "John", cohort_id: 2 },
        { name: "Frank", cohort_id: 3 }
      ]);
    });
};
