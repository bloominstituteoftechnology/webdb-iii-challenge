exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(table) {
      table.increments();
      table
        .string('name', 128)
        .notNullable()
        .unique('student_name');
      table
        .integer('cohort_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cohorts');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('students');
  };