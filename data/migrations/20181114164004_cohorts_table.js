exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(tbl) {
    //   Primary Key
    tbl.increments();
    // Other Fields
    tbl.string("name", 128).unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
