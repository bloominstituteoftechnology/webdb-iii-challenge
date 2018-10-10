
exports.up = function(knex, Promise) {
  //creates the change we want in our db
  return knex.schema.createTable('cohorts', function(tbl) {
      // primary key called id
    tbl.increments(); // by default creates and id field that autoincrements
    tbl
        .string('name')
        // .notNullable()
        .unique('name');
  });
};
 exports.down = function(knex, Promise) {
  // rollback
  return knex.schema.dropTable('cohorts');
};