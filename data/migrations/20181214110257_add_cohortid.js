exports.up = function(knex, Promise) {
  return knex.schema.table("students", function(table) {
    // Add cohort ID that references the ID in the cohort table
    // `cohort_id`: references the `id` in the cohorts table.
    table
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts");
  });
};

exports.down = function(knex, Promise) {
  // Rollback
  return knex.schema.table("students", function(table) {
    table.dropColumn("cohort_id");
  });
};
