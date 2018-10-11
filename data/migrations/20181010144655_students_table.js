
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
    tbl.increments();

    tbl.string('name', 100).notNullable();

    tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
