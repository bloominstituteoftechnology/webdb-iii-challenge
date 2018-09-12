exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(tbl) {
    // .increments() generates a primary key and makes it autoincrement
    tbl.increments();
    tbl
      .string("name", 80)
      .notNullable()
      .unique("name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cohorts");
};

