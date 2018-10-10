
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tb) {
    tb.increments();
    tb.string('name', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
