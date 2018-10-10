
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(cohort) {
    cohort.increments();

    cohort.string('name', 255).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('courses');
};
