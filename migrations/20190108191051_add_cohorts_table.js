
exports.up = function(knex, Promise) {
    knex.schema.createTable('cohorts', function (table) {
        table.increments('id');
        table.string('name').notNullable();
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('cohorts');
};
