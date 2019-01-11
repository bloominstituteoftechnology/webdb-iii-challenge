
exports.up = function (knex, Promise) {
    return knex.schema.createTable('students', table => {
        table.increments();
        table
            .integer('cohort_id')
            .notNullable()
            .references('id')
            .inTable('cohorts');
        table.string('name').notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExits('students');
};
