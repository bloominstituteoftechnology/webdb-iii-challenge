
exports.up = function (knex, Promise) {
    return knex.schema.createTable('cohorts', function (tbl) {
        tbl.increments('id');
        tbl.string('name')
            .notNullable()
            .unique('name');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cohorts');
};
