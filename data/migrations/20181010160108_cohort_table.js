exports.up = (knex, Promise) =>
  knex.schema.createTable('cohorts', table => {
    table.increments();
    table
      .string('name', 128)
      .notNullable()
      .unique('name');
  });

exports.down = (knex, Promise) => knex.schema.dropTable('cohorts');
