exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "FSW-13" },
        { name: "FSW10" },
        { name: "UX-Design-1" }
      ]);
    });
};
