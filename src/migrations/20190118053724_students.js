exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(students) {
    students.increments();
    students
      .integer('cohort_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cohorts');

    students.string('name', 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
