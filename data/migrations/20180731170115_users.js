
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (users) {
        users.increment();

        users.string('name', 128).notNullable();
        users.string('createdAt').defaultTo(Date.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
