
exports.up = function(knex, Promise) {
    return knex.schema.creataeTable('posts', function(tbl) {
        tbl.increments('id');
        tbl
            .integer('userId')
            .notNullable()
            .references('id')
            .inTable('users');
        tbl.string('text', 1000);
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
