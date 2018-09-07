exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { id: 1, name: "Name1", cohort_id: 1 },
        { id: 2, name: "Name2", cohort_id: 3 },
        { id: 3, name: "Name3", cohort_id: 3 }
      ]);
    });
};
