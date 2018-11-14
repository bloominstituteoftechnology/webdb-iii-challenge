exports.up = function (knex, Promise) {
  return knex.schema.createTable('cohorts', function (tbl) {
    tbl.increments();
    tbl.string('name', 255).notNullable
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTablesIfExists('students')
};