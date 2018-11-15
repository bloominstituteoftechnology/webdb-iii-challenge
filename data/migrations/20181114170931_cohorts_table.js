
exports.up = function (knex, Promise) {
  //makes changes to the database
  return knex.schema.createTable('cohorts', function (tbl) {

    //primary key
    tbl.increments(); //my id field with autoincrement. 

    //other fields
    tbl
      .string('name', 120)
      .unique("name")
      .notNullable();
  });
};

exports.down = function (knex, Promise) {
  //undoes changes to the database(rolling back)
  return knex.schema.dropTableIfExists('cohorts');
};
