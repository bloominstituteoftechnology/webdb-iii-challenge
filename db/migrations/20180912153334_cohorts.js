exports.up = function(knex, Promise) {
  // implement the change we want in our db
  return knex.schema.createTable("cohorts", function(tbl) {
    tbl.increments(); // generates a primary key called id and makes it autoincrement
    tbl
      .string("name", 128)
      .notNullable()
      .unique("name");
  });
};

exports.down = function(knex, Promise) {
  // we undo the changes made to the db // rollback
  return knex.schema.dropTable("cohorts");
};
