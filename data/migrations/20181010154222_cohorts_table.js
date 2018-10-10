// Latest table schema
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', tbl => {
      tbl.increments(); // Primary ID, Auto Increments
      tbl.string('name', 255).notNullable(); // Name field, required
  })
};

// Rollback to previous table schema
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts'); // Remove table
};
