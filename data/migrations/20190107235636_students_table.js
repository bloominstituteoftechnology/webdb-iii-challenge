
exports.up = function(knex, Promise) {
    return knex.schema.createTable("students", table => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.integer('cohort_id').references('cohorts.id') ;
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("students");
};
