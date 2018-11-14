exports.up = function(knex, Promise) {
    return knex.schema.createTable("students", function(tbl) {
  
      //primary key
      tbl.increments();
      tbl.string("name", 255);
  
      tbl
        .integer('cohort_id')
        .unsigned()
        .references('id')
        .inTable('cohorts');
    })
  };
  
  exports.down = function(knex, Promise) {
    // undoes the changes to the database (rollback)
    return knex.schema.dropTableIfExists("students");
  };