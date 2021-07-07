exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(table) {
    table.increments();
    table.string('name', 128).unique('students_name');
    table
      .integer('cohort_id')
      .notNullable()
      .defaultTo(1)
      .references('id')
      .inTable('cohorts');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('students');
};
