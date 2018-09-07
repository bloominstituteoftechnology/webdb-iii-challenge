exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { id: 1, name: "Fred", cohort_id: 1 },
        { id: 2, name: "Joe", cohort_id: 1 },
        { id: 3, name: "Selma", cohort_id: 3 }
      ]);
    });
};
