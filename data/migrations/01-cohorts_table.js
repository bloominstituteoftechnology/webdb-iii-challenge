
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl) {
    // primary key called id
    tbl.increments(); // by default creates and id field

    tbl.string('name', 10).notNullable();
  });
};

exports.down = function(knex, Promise) {
  // rollback
  return knex.schema.dropTableIfExists('cohorts');
};
