
exports.up = function(knex, Promise) {
    return knex.schema.createTable("cohorts", function(table) {
        table.increments(); //primary key called id, autoincrement
        table
            .string("name", 128)
            .notNullable()
            .unique("name");
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("cohorts");
};
