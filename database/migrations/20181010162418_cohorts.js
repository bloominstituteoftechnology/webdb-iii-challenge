
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(cohorts) {
    cohorts.increments();
    cohorts.text('name', 'mediumText').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};