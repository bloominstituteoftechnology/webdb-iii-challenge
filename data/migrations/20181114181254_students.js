exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", table => {
    //primary key
    table.increments();
    table.string("name", 255).notNullable();
    table
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists();
};
