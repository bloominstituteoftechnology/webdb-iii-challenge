exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", table => {
    table.increments(`id`).primary();
    table
      .string(`name`, 128)
      .notNullable()
      .unique(`name`);
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(`cohorts`)
};
