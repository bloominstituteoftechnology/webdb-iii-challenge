exports.up = function(knex, Promise) {
    return knex.schema.createTable('students_table', function(tbl) {
        // creates primary key (id)
        tbl.increments(); 
    
        tbl
        .string('name', 333)
        .notNullable() // sets as required
        .unique('name'); // creates index

        //foreign key
        tbl
        .integer('cohort_id')
        .unsigned() //specifies an integer as unsigned. No-op if this is chained off of a non-integer field.
        .references('id')
        .inTable('cohorts_table');

        });
    };

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students_table');
};