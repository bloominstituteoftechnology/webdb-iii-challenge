
exports.up = function (knex, Promise) {
    return knex.schema.createTable('tags', function (table) {
        table.increments();

        table.string('tag', 16);
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('tags');
};
