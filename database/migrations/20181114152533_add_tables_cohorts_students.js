

//== Create Tables: Cohorts, Students ==========================================

//-- Constants -----------------------------------
const TABLE_COHORTS  = 'cohorts' ;
const TABLE_STUDENTS = 'students';

//-- Migration -----------------------------------
exports.up = function(knex, Promise) {
    // Create all Tables
    return Promise.all([
        // Cohorts Table
        knex.schema.createTable(TABLE_COHORTS, table => {
            table.increments('id').primary();
            table.string('name').notNullable();
        }),
        // Students Table
        knex.schema.createTable(TABLE_STUDENTS, table => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.foreign('cohort_id').references(`${TABLE_COHORTS}.id`);
        }),
    ]);
};
exports.down = function(knex, Promise) {
    // Destroy all Tables (Cohorts & Students)
    return Promise.add([
        knex.schema.dropTable(TABLE_COHORTS ),
        knex.schema.dropTable(TABLE_STUDENTS),
    ])
};
