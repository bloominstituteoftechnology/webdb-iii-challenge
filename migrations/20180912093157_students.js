
exports.up = function(knex, Promise) {
  // implement the change we want in db
  return knex.schema.createTable('students', function(tbl){
      tbl.increments();

      tbl
      .string('name')
      .notNullable()
      .unique('student_name');

      tbl
      .integer('cohort_id')
      .notNullable()
      .references('id')
      .inTable('cohorts')
  });
};

exports.down = function(knex, Promise) {
  // undo the change made to db
  return knex.schema.dropTable('students');
};
