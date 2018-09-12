exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", function(tbl) {
    tbl.increments();

    tbl
      .string("name", 128)
      .notNullable()
      .unique("uq_students_id");

    tbl
      .integer("cohort_id")
      .notNullable()
      .references("id")
      .inTable("cohort");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cohort");
};
