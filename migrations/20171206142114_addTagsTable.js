
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags', function(tbl) {
        tbl.increments('id');

        // many-to-many relationship with post and id
        tbl
            .integer('postId')
            .notNullable()
            .references('id')
            .inTable('posts');
        tbl.string('tag', 16).unique('tag', 'uq_tag');
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tags');
};
