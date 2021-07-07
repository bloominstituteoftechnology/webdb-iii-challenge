
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function (tbl) {
        tbl.increments();

        tbl
            .string('name', 128)
            .notNullable()
            .unique('uq_student_name');

        tbl
            .integer('cohort_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('cohorts');
            
});
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('students');
};
