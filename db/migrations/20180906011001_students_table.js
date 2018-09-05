
exports.up = function(knex, Promise) {
    return knex.schema.createTable(`students`, table => {
        table.increments(`id`).primary();
        table
            .string(`name`, 128)
            .notNullable()
        table
            .integer(`cohort_id`)
            .unsigned()
            .notNullable()
            .references(`id`)
            .inTable(`cohorts`)        
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(`students`)
};
