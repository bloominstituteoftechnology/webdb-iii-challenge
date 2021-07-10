
exports.up = function(knex, Promise) {
    //the change we want to make to the schema
    return knex.schema.createTable
    ('cohorts', table => {
        table.increments();
        table.string('name').notNullable();
    });
};

exports.down = function(knex, Promise) {
    //how we undo the change
    return knex.schema.dropTableIfExists
    ('cohorts');
};
