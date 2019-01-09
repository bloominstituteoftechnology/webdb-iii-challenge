exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", tbl => {
    tbl.increments();
    tbl.string("name", 240).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};