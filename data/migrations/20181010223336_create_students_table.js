exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", function(table) {});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("students");
};
