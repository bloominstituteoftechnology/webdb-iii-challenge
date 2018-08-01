
exports.up = function (knex, Promise) {
    return knex.schema.createTable('tags', function (table) {
        table.increments();

        table.integer('postId').references('id').inTable('posts');
        table.string('tag', 16);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('tags');
};
