exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl) {
      tbl.increments();
  
      tbl
        .string('name', 128)
        .notNullable()
        .unique('uq_student_name');
  
      // foreign key
      tbl
        .integer('cohort_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cohorts');
    });
  };
  
  exports.down = function(knex, Promise) {
    // we undo the changed made to the db on knex:migrate rollback
    return knex.schema.dropTable('sections');
  };
  