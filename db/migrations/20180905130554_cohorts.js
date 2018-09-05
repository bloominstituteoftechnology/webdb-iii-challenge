
exports.up = function(knex, Promise) {
  //implement change we want in our database
  return knex.schema.createTable('cohorts', function(tbl) {
    tbl.increments();
    tbl
        .string('name')
        .notNullable()
        .unique('name');//generates primary key and makes it autoincrement
  });
};

exports.down = function(knex, Promise) {
  // we undo the changes made to the database on knex:migrate rollback
  return knex.schema.dropTable('cohorts');
};
