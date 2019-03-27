exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Victor", cohort_id: 1 },
        { name: "Emilio", cohort_id: 2 },
        { name: "Wenjun", cohort_id: 3 },
        { name: "Tyler", cohort_id: 3 },
        { name: "Kevin", cohort_id: 2 }
      ]);
    });
};
