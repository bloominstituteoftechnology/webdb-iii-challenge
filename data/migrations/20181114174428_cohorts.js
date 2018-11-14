exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", table => {
    // primary key: ID
    table.increments(); //for autoincrement
    table.string("name", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  // here's the rollback
  return knex.schema.dropTableIfExists("cohorts");
};
