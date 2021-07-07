exports.seed = function(knex, Promise) {
  return knex("cohorts")
    .del()
    .then(function() {
      return knex("cohorts").insert([
        { name: "CS11" },
        { name: "CS12" },
        { name: "CS13" }
      ]);
    });
};
