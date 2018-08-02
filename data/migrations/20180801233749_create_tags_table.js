
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags', function(table) {
        table.increments();
        table.string('tag').notNullable().unique();
        table.timestamp('createdAt').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tags');
};
