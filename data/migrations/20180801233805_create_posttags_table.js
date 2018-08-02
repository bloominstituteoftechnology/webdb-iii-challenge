
exports.up = function(knex, Promise) {
    return knex.schema.createTable('posttags', function(table) {
        table.increments('id').primary();
        table.integer('tagId').references('id').inTable('tags');
        table.integer('postId').references('id').inTable('posts');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('posttags');
};
