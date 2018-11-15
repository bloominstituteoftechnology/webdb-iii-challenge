

//== Seed Tables: Cohorts, Students ============================================

//-- Dependencies --------------------------------
const config = require('../../config.js');

//-- Seeding -------------------------------------
exports.seed = function(knex, Promise) {
    // Delete ALL existing entries then populate each table
    return Promise.all([
        // Populate Cohorts
        knex(config.TABLE_COHORTS).del().then(() => {
            return knex(config.TABLE_COHORTS).insert([
                {[config.FIELD_NAME]: 'Test Cohort 1'},
                {[config.FIELD_NAME]: 'Test Cohort 2'},
                {[config.FIELD_NAME]: 'Test Cohort 3'},
            ]);
        }),
        // Populate Students
        knex(config.TABLE_STUDENTS).del().then(() => {
            return knex(config.TABLE_STUDENTS).insert([
                {[config.FIELD_NAME]: 'Test Student A', [config.FIELD_COHORT_ID]: '1'},
                {[config.FIELD_NAME]: 'Test Student B', [config.FIELD_COHORT_ID]: '2'},
                {[config.FIELD_NAME]: 'Test Student C', [config.FIELD_COHORT_ID]: '2'},
                {[config.FIELD_NAME]: 'Test Student D', [config.FIELD_COHORT_ID]: '3'},
                {[config.FIELD_NAME]: 'Test Student E', [config.FIELD_COHORT_ID]: '3'},
                {[config.FIELD_NAME]: 'Test Student F', [config.FIELD_COHORT_ID]: '3'},
            ]);
        }),
    ]);
};
