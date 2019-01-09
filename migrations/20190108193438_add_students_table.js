
exports.up = function(knex, Promise) {
    knex.schema.createTable('students', function (table) {
        table
            .increments('id');
        table
            .string('name')
            .notNullable();
    })
};

exports.down = function(knex, Promise) {
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
};
