exports.seed = function(knex, Promise) {
  // Resets ids back to one
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "cs14" },
        { name: "cs15" },
        { name: "cs16" }
      ]);
    });
};
