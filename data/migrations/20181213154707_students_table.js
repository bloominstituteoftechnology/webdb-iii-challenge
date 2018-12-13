exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", function(table) {
    // Add primary key ID
    table.increments();
    // Add a name field that is required
    table.string("name", 255).notNullable();
    // Add cohort ID that references the ID in the cohort table
  });
};

exports.down = function(knex, Promise) {
  // Rollback
  return knex.schema.dropTableIfExists("students");
};
