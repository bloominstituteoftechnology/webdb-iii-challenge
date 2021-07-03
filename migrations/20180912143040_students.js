
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl){

        tbl.increments();

        tbl
        .string('name', 128);
    
        tbl
        .integer('cohort_id')
        .notNullable()
        .defaultTo('not provided');


});

}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('students');
};
