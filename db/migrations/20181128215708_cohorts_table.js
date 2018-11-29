exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts_table', function(tbl) {
        // creates primary key (id)
        tbl.increments(); 
    
        tbl
        .string('name', 333)
        .notNullable() // sets as required
        .unique('name'); // creates index
        
        
        });
    };

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts_table');
};
  
