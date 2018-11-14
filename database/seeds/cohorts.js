

//== Seed Tables: Cohorts, Students ============================================

//-- Constants -----------------------------------
const TABLE_COHORTS  = 'cohorts' ;
const TABLE_STUDENTS = 'students';

//-- Seeding -------------------------------------
exports.seed = function(knex, Promise) {
    // Delete ALL existing entries then populate each table
    return Promise.all([
        // Populate Cohorts
        knex(TABLE_COHORTS).del().then(() => {
            return knex(TABLE_COHORTS).insert([
                {name: 'Test Cohort 1'},
                {name: 'Test Cohort 2'},
                {name: 'Test Cohort 3'},
            ]);
        }),
        // Populate Cohorts
        knex(TABLE_STUDENTS).del().then(() => {
            return knex(TABLE_STUDENTS).insert([
                {name: 'Test Student 1', cohort_id: '1'},
                {name: 'Test Student 2', cohort_id: '2'},
                {name: 'Test Student 3', cohort_id: '3'},
            ]);
        }),
    ]);
};
