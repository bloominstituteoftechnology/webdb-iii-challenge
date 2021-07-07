
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(table) {
    table
    .integer('cohort_id')
    .unsigned()
    .references('id')
    .inTable('cohorts');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('students', function(table) {
    table.dropColumn('cohort_id');
  });
};
