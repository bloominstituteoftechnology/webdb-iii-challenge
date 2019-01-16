
exports.up = function(knex, Promise) {
    //changes to be made to the schema
    return knex.schema.createTable('cohorts', table => {
        table.increments();
        table.string('name').notNullable();
    });
};

exports.down = function(knex, Promise) {
    // CMD+Z
    return knex.schema.dropTableIfExists('cohorts');

  
};
