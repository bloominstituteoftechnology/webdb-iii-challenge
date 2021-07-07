exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Edd", cohort_id: "CS2" },
        { name: "Kevin", cohort_id: "CS1" },
        { name: "Carlo", cohort_id: "CS2" },
        { name: "Checo", cohort_id: "CS2" },
        { name: "Katy", cohort_id: "CS2" },
        { name: "Sabrina", cohort_id: "CS2" },
        { name: "Ian", cohort_id: "CS2" },
        { name: "Yuseef", cohort_id: "CS2" },
        { name: "Pedro", cohort_id: "CS2" }
      ]);
    });
};
