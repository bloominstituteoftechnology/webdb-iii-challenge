
exports.up = function(knex, Promise) {
    return knex.schema.createTable('student', function(tbl) {
        tbl.increments();
         tbl
          .string('name', 128)
          .notNullable();
         tbl
          .integer('cohort_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('cohort');
    })
  };
   exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('students');
  };
