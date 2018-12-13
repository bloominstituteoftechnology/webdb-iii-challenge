exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(table) {
    // Add primary key ID
    table.increments();
    // Add a name field that is required
    table.string("name", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  // Rollback
  return knex.schema.dropTableIfExists("cohorts");
};
