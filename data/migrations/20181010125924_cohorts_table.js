exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', function(tbl) {
        //primary key called id
        tbl.increments(); //by default creates an id field that autoincrements, will be primary by default
  
        tbl.string('name', 128).notNullable();
        
    })
  };
  
  //behaves like an undo for the structure of your database
  exports.down = function(knex, Promise) {
    //configure the undo, rollback
      return knex.schema.dropTableIfExists('courses');
  };
