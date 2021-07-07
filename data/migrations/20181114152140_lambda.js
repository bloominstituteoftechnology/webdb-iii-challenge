exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', tbl => {
    // primary key
    tbl.increments();
    // name field - required
    tbl.string('name', 255).notNullable();
    // Timestamp
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {};
