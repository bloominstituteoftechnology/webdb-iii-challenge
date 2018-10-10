// Create Students Table
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', (tableObject) => {
      // Set up primary key
      tableObject.increments();
  
      // Set up name column
      tableObject.string('name', 256).notNullable();

      // Set up cohort_id column as a foreign key
      tableObject
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts');
      
    })
  };
  
  // Drop Cohorts Table
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
  };
  