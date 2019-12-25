// COHORTS: id: primary key, autoincrements.
// name: text, required.



exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', function(tbl) {
        tbl.increments('id').unsigned().primary();
        tbl.string('name',128).notNullable().defaultTo('not provided');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cohorts');
};
