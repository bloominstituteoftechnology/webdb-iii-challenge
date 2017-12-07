
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id');
        table.string('name', 128).notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
