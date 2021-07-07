exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "FSW13 (precursor to greatness)" },
        { name: "FSW14 (best cohort)" },
        { name: "FSW15 (big shoes to fill)" }
      ]);
    });
};
