
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(table) {
    table.increments();
    table.string('name', 128).notNullable();
    table.unique('name');
    table
      .integer('cohort_id')
      .unsigned()
      .reference('id')
      .inTable('cohorts')

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
