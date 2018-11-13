exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(table) {
    table.increments();
    table.string('name', 128);
    table
      .integer('course_id')
      .notNullable()
      .unsigned()
      .defaultTo(1)
      .references('id')
      .inTable('courses');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('students');
};
