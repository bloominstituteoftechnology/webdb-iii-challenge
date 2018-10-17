exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', (tableObject) => {
    tableObject.increments();
    tableObject.string('name', 128).notNullable();
    tableObject.unique('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
