exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohort", function(tbl) {
    tbl.increments();
    tbl
      .string("name", 128)
      .notNullable()
      .unique("cohort_name");
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohort");
};
