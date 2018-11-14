
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', tbl => {
        tbl.increments('student_id');
        tbl.string('name', 100).notNullable();
        tbl.integer('cohort_id')
            .notNullable()
            .references('cohort_id')
            .inTable('cohorts');

    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
