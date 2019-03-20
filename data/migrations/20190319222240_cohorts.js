
exports.up = function(knex, Promise) {
    knex.schema.createTable('cohorts', tbl => {
        tbl.increments();
        tbl
            .string('name', 128)
            .notNullable()
            .unique();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('roles');
};
