
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(students) {
      students.increments();
      students.text('name', 'mediumText').notNullable();
      students.integer('cohort_id').notNullable().references('id').inTable('cohorts');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};