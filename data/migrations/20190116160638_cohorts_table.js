

exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', function(tbl) {
        //primary key called id
        // be default creates an id field that autoincrements
        tbl.increments(); 
  
        tbl.string('name', 255).notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
    //rollback
    return knex.schema.dropTableIfExists('cohorts');
  };
