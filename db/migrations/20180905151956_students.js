exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", function(session) {
    session.increments();
    session
      .string("name", 128)
      .notNullable()
      .unique("uq-student-name");
    session
      .integer("cohort_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("cohorts");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("students");
};
