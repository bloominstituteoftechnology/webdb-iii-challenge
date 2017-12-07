exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', function(table) {
        table.increments('id');
        table
            .integer('userID')
            .notNullable()
            .references('id')
            .inTable('users');
        table.text('text').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
