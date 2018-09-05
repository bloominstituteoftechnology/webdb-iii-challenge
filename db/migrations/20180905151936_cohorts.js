exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(session) {
    session.increments();
    session
      .string("name", 255)
      .notNullable()
      .unique("name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
