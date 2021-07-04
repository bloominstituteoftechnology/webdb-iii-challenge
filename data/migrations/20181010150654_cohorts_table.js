// Create Cohorts Table
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', (tableObject) => {
    // Set up primary key
    tableObject.increments();

    // Set up name column
    tableObject.string('name', 128).notNullable();

    // Set up unique columns
    tableObject.unique('name');
  })
};

// Drop Cohorts Table
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
