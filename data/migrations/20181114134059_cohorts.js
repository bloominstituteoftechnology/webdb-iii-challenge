exports.up = function (knex, Promise) {
  //makes changes to the database
  return knex.schema.createTable('cohorts', function (tbl) {
    //primary key
    tbl.increments();
    //other fields
    tbl.string('name', 255).unique();

    tbl.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};