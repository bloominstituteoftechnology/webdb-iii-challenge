exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags', function(table) {
        table.increments('id');
        table.string('tag', 16).unique()
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tags');
};
