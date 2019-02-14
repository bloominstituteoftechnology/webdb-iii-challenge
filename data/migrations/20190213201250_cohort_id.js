
exports.up = function(knex, Promise) {
  return knex.schema.table('students', table => {
      table
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students')
};
