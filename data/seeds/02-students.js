exports.seed = function(knex, Promise) {
  return knex("students")
    .del()
    .then(function() {
      return knex("students").insert([
        { name: "John Jacob Jingleheimer Schmidt", cohort_id: 1 },
        { name: "Mary Poppins", cohort_id: 1 },
        { name: "Darcy Bingham", cohort_id: 1 }
      ]);
    });
};
