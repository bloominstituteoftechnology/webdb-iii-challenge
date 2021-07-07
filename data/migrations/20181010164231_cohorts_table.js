
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(table) {
    //id AI
    table.increments();
    table.string('name', 128).notNullable();
    table.unique('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
