
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
    tbl.increments();

    tbl.string('name').notNullable().unique('student_name');

    tbl
    .integer('cohort_id')
    .notNullable()
    .references('id')
    .inTable('cohorts');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('students');
};
