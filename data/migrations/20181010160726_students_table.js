
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tb) {
    tb.increments();
    tb.string('name', 255).notNullable();
    tb
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
