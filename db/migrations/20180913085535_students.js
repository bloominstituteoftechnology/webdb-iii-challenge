exports.up = function(knex, Promise) {
    // implement the change we want in our db
    return knex.schema.createTable('students', function(tbl) {
        tbl.increments(); //genereates a primary key called id and makes it  auto-increment

        tbl
            .string('name', 128)
            .notNullable();

        tbl
            .integer('cohort_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('cohorts');
            
    }) 
  };
  
  exports.down = function(knex, Promise) {
    // undo the change we made to the db with knex:migrate rollback
    return knex.schema.dropTable('students');
  };
  