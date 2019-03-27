exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "WEB17" },
        { name: "CS11" },
        { name: "Labs8" },
        { name: "WEB18" },
        { name: "WEB16" }
      ]);
    });
};
