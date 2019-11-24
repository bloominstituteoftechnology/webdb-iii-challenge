exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .del() //delete records from table
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "FSW12", started: true },
        { name: "FSW13", started: false },
        { name: "FSW14", started: false }
      ]);
    });
};


