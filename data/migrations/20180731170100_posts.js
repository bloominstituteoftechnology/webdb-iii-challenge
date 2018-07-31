
exports.up = function (knex, Promise) {
    return knex.schema.createTable('posts', function (posts) {
        posts.increments();

        posts.integer('userId');
        posts.text('text').notNullable();
        posts.string('createdAt').defaultTo(Date.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
