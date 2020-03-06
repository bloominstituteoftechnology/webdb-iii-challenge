exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts_table', function(tbl) {
        // make changes to the table using the tbl object passed as a parameter
       // id: primary key, auto-increments.
       // name: text, required.
        // primary key
        tbl.increments(); // generate and id field and make it autoincfement and the primary key
    
        // other fields
        tbl
        .string('name', 255)
        .notNullable()
        .unique('name');
       
        
      });
    };

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts_table');
};

