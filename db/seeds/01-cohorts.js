exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("table_cohorts").insert([
        { name: "FSW1", started: true },
        { name: "FSW2", started: false },
        { name: "FSW3", started: false }
      ]);
    });
};
