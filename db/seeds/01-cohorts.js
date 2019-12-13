exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { id: 1, name: "cs10" },
        { id: 2, name: "cs11" },
        { id: 3, name: "cs12" }
      ]);
    });
};
