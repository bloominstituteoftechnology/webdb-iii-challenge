
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', tbl => {
        tbl.increments('cohort_id');
        tbl.string('name', 250).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts');
};
