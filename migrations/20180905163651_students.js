
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', (tbl) => {
        tbl.increments('id');
        tbl.string('name')
            .notNullable()
            .unique('first_name');
        tbl.integer('cohort_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('cohorts');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('students');
};
