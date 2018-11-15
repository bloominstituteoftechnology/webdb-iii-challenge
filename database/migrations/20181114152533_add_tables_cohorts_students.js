

//== Create Tables: Cohorts, Students ==========================================

//-- Dependencies --------------------------------
const config = require('../../config.js');

//-- Migration -----------------------------------
exports.up = function(knex, Promise) {
    // Create all Tables
    return Promise.all([
        // Cohorts Table
        knex.schema.createTable(config.TABLE_COHORTS, table => {
            table.increments(config.FIELD_ID).primary();
            table.string(config.FIELD_NAME).notNullable();
        }),
        // Students Table
        knex.schema.createTable(config.TABLE_STUDENTS, table => {
            table.increments(config.FIELD_ID).primary();
            table.string(config.FIELD_NAME).notNullable();
            table.integer(config.FIELD_COHORT_ID);
            table.foreign(config.FIELD_COHORT_ID)
            .references(`${config.TABLE_COHORTS}.${config.FIELD_ID}`);
        })
    ]);
};
exports.down = function(knex, Promise) {
    // Destroy all Tables (Cohorts & Students)
    return Promise.add([
        knex.schema.dropTable(config.TABLE_COHORTS ),
        knex.schema.dropTable(config.TABLE_STUDENTS),
    ])
};
