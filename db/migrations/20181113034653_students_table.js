exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(table) {
    table.increments();
    table.string('name', 128);
    table
      .integer('course_id')
      .notNullable()
      .defaultTo(1);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('students');
};
