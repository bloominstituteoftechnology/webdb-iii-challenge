exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .del() //delete records from table
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Vance", cohort_id: 8},
        { name: "James", cohort_id: 9},
        { name: "Renee", cohort_id: 10}
      ]);
    });
};


