exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { id: 1, name: "mikko 1" },
        { id: 2, name: "mikko 2" },
        { id: 3, name: "mikko 3" }
      ]);
    });
};
