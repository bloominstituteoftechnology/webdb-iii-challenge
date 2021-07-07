exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "Cohort 1" },
        { name: "Cohort 2" },
        { name: "Cohort 3" }
      ]);
    });
};
