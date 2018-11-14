exports.up = function(knex, Promise) {
    return knex.schema.createTable("cohorts", function(tbl) {
  
      //primary key
      tbl.increments();
      tbl.string("name", 255);
    })
  };
  
  exports.down = function(knex, Promise) {
    // undoes the changes to the database (rollback)
    return knex.schema.dropTableIfExists("cohorts");
  };