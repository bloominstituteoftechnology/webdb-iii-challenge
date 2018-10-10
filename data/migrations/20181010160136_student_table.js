exports.up = (knex, Promise) =>
  knex.schema.createTable('students', table => {
    table.increments();
    table
      .string('name', 128)
      .notNullable()
      .unique('student_name');
    table
      .integer('cohort_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cohorts');
  });

exports.down = (knex, Promise) => knex.schema.dropTable('students');
