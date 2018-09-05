exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(table) {
    table.increments();
    table
      .string('name', 128)
      .notNullable()
      .unique('student_name');

    table.integer('cohort_id').unsigned();
    table.foreign('cohort_id').references('cohorts.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
