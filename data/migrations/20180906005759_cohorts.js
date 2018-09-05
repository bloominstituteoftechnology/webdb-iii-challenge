exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(table) {
    table.increments();

    table
      .string('name', 128)
      .notNullable()
      .unique('cohort_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
