exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Sarah", cohort_id: 1 },
        { name: "Angela", cohort_id: 3 },
        { name: "Jess", cohort_id: 1 },
        { name: "Marc", cohort_id: 2 },
        { name: "Nia", cohort_id: 2 },
        { name: "James", cohort_id: 3 },
        { name: "Tom", cohort_id: 1 }
      ]);
    });
};
