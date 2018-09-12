exports.up = function(knex, Promise) {
  //implement the change we want in our db, commit
  return knex.schema.createTable("courses", function(tbl) {
    //changes are in here
    tbl.increments(); //generates a primary key called id and makes it auto-increment

    tbl
      .string('name', 128)
      .notNullable()
      .unique('name')
  });
};

exports.down = function(knex, Promise) {
  //we undo the change make to the db, rollback knex: migrate rollback
    return knex.schema.dropTable('courses');

};
