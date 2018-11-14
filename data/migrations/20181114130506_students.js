
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl) {
        tbl.increments('StudentID');
        tbl.string('name', 128);
        tbl.integer('Cohort_ID')
            .unsigned()
            .references('CohortID')
            .inTable('cohort');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
