
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl) {
        tbl.increments();

        tbl
        .string('name', 150)
        .notNullable();
        
        tbl
        .integer('cohort_id')
        .unsigned() // specifies an integer as unsigned
        .notNullable()
        .references('id') // sets the column that the current column references as a foreign key
        inTable('cohorts'); // sets the "table" where the foreign key column is located after calling references
    })
 
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
  
};
