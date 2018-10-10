
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(student) {
    student.increments();

    student.string('name', 128).nutNullable();

    student.unique('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
