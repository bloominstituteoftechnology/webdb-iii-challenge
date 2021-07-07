exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", table => {
    table.increments();
    table.text("name");
    table
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts");
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists("students");
};
