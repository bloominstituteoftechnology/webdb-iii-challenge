exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([{ name: "CS13" }, { name: "FSW14" }, { name: "FSW15" }]);
    });
};
