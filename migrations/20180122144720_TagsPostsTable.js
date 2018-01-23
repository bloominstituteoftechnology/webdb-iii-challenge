
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tagspost', function(tbl) {
        tbl.increments();
        tbl.integer('postId').notNullable().references('id').inTable('posts');
        tbl.integer('tagID').notNullable().references('id').inTable('tags');
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tagspost');
};
