exports.up = function(knex, Promise) {
  //creates the users table
  //runs when we execute the migration
  return knex.schema.createTable("tags", tbl => {
    tbl.primary().increments();
    tbl.string("tag", 16).notNullable();
    tbl.timestamp("created_At").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  //deletes the users table
  //runs when rolling back migration
  return knex.schema.dropTableIfExists("tags");
};
