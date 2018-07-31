
exports.up = function (knex, Promise) {
    return knex.schema.createTable('tags', function (tags) {
        tags.increments();

        tags.string('tag', 16);
        tags.string('createdAt').defaultTo(Date.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('tags');
};
