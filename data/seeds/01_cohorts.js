exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "FSW1" },
        { name: "FSW2" },
        { name: "FSW3" },
        { name: "FSW4" },
        { name: "FSW5" },
        { name: "FSW6" },
        { name: "FSW7" },
        { name: "FSW8" },
        { name: "FSW9" }
      ]);
    });
};
