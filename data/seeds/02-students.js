exports.seed = function(knex, Promise) {
  // Truncates ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Colin", cohort_id: 1 },
        { name: "John", cohort_id: 2 },
        { name: "Tommy", cohort_id: 3 }
      ]);
    });
};
