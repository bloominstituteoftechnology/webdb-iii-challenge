
exports.up = function (knex, Promise) {
    return knex.schema.createTable('post_tags', function (table) {
        table.increments();

        table.integer('postId').references('id').inTable('posts');
        table.integer('tagId').references('id').inTable('tags');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
