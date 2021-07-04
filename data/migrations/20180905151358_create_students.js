
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
    tbl.increments();
    tbl
      .integer('cohort_id')
      .notNullable()
      .references('id')
      .inTable('cohorts');

    tbl
      .string('name', 255)
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
