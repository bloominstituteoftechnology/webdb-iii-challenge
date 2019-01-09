
exports.up = function(knex, Promise) {
    knex.schema.createTable('students', function (table) {
        table
            .increments('id');
        table
            .string('name')
            .notNullable();
        table
            .integer('cohort_id')
            .notNullable()
            .references('id')
            .inTable('cohorts');
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('students');
};
