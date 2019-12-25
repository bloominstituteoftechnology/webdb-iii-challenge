//STUDENTS: id: primary key, autoincrements.
// name: text, required.
// cohort_id: references the id in the cohorts table.

exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl) {
        tbl.increments('id').unsigned().primary();
        tbl.string('name',128).notNullable().defaultTo('not provided');
        tbl.integer('cohort_id').unsigned().notNullable().references('id').inTable('cohorts');
    });
};


exports.down = function(knex, Promise) {
    return knex.schema.dropTable('students');
};
