
exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', function(table) {
        table.increments('id').primary();
        table.integer('userId').references('id').inTable('users');
        table.string('text').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('posts');
};
