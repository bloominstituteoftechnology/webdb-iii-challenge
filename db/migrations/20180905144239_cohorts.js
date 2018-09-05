
exports.up = function(knex, Promise) {
  return knex.schema.createTable('courses', function(tbl) {
    //generates a primary key called id and makes it auto-increment
    tbl.increments();
    
    tbl
    .string('name', 128)
    .notNullable()
    .unique('mame');
  });
};

exports.down = function(knex, Promise) {
  //undo the changes made to the db on knex:migrate rollback
  return knex.schema.dropTable('courses');
};
