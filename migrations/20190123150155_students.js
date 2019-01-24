exports.up = function(knex, Promise) {
  return knex.schema.createTable("Students", function(tbl) {
    tbl.increments();

    tbl.string("name", 255);

    tbl
      .integer("cohorts_id")
      .notNullable()
      .references("id")
      .inTable("cohorts");

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {};
