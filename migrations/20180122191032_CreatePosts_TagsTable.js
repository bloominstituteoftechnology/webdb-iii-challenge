
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Posts_Tags', function(tb1) {
        tb1
            .primary()
            .increments('id');
        tb1
            .integer('postId').unsigned().references('id').inTable('Posts')
        tb1
            .integer('tagId').unsigned().references('id').inTable('Tags')
        tb1.timestamp('createdAt').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Posts_Tags')
};
