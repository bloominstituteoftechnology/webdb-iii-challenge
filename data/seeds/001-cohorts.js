exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "FS13" },
        { name: "FS14" },
        { name: "FS15" }
      ]);
    });
};
