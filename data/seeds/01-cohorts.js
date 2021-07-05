exports.seed = function(knex, Promise) {
  // Truncate ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "CSPT1" },
        { name: "CSPT2" },
        { name: "CSPT3" }
      ]);
    });
};
